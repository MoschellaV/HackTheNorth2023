from fastapi import FastAPI, File, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import os
from pydantic import BaseModel
import numpy as np
import tensorflow as tf
from math import floor
import time
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from helper import update_job_status



app = FastAPI()

# initialize firebase 
cred = credentials.Certificate('./serviceAccountKey.json')
firebase_admin.initialize_app(cred)
db = firestore.client()


class Train(BaseModel):
    target: str


origins = [
    "http://localhost:3000",  # Adjust this to your frontend's address
    "localhost:3000",
    "http://127.0.0.1:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# UPLOAD CSV FILE AND RETURN POSSIBLE COLUMNS
@app.post("/api/train-upload/{user_id}/{model_id}")
async def upload_csv(user_id: str, model_id: str, file: UploadFile = File(...)):
    delimiter = ','



    # The 'file' parameter is used to receive the uploaded CSV file.
    # The 'delimiter' parameter is used to specify the delimiter used in the CSV file (default is comma ',').
    # Check the content type to ensure it's a CSV file
    if file.content_type != 'text/csv':
        return {"error": "Only CSV files are allowed."}

    # Read the CSV content
    csv_content = await file.read()

    # You can now process the CSV content as needed.
    # For example, you can parse it using the specified delimiter.
    lines = csv_content.decode('latin-1').splitlines()

    header = lines[0].split(delimiter)

    # Check for "local" directory
    if not os.path.exists("local"):
        os.mkdir("local")

    # Check for user_id directory inside "local"
    user_path = os.path.join("local", user_id)
    if not os.path.exists(user_path):
        os.mkdir(user_path)

    # Check for model_id directory inside user_path
    model_path = os.path.join(user_path, model_id)
    if not os.path.exists(model_path):
        os.mkdir(model_path)

    # Save the CSV content inside the model_id directory
    with open(os.path.join(model_path, "data.csv"), "wb") as f:
        f.write(csv_content)

    # TODO: Return only good headers
    df = os.path.join(".", "local", user_id, model_id, "data.csv")
    df = pd.read_csv(df)
    for col in df.columns:
        if len(df[col].unique()) > 10:
            header.remove(col)
    return {"columns": header}


@app.post("/api/train/{user_id}/{model_id}")
async def train_model(user_id: str, model_id: str, target: Train):
    update_job_status(model_id, "Analyzing Data")
    df = os.path.join(".", "local", user_id, model_id, "data.csv")
    df = pd.read_csv(df)

    data = train(df, [], target.target, user_id, model_id)
    return data


@app.post("/api/predict/{user_id}/{model_id}/csv")
async def upload_csv_predict(
        user_id: str,
        model_id: str,
        file: UploadFile = File(...),
        target: str = Form(...)
):
    # change the file into a dataframe
    df = pd.read_csv(file.file)
    # call predict function
    return predict(df, target, user_id, model_id)


@app.post("/api/predict/{user_id}/{model_id}/json")
async def upload_json_predict(user_id: str, model_id: str, file: UploadFile = File(...)):
    # transform user input into a dataframe
    df = pd.read_json(file.file)
    # call predict function
    predict(df, user_id, model_id)


# GET ALL MODELS FOR USER_ID
@app.get("/api/models/{user_id}")
async def get_models(user_id: str):
    # check if local directory exists or local/user_id exists
    if not os.path.exists("local") and not os.path.exists(os.path.join("local", user_id)):
        return {"error": "No models found."}

    # get all models for user_id
    models = os.listdir(os.path.join("local", user_id))

    return {"models": models}


def train(df, remove_cols, target, user_id, model_id):
    BATCH_SIZE = 64  # 32
    EPOCHS = 50  # 100

    # Print the shape of your data
    id_columns = []
    # check each column, if it increments by 1, it is an id column
    print(len(df))
    for col in df.columns:
        if df[col].is_monotonic_increasing:
            id_columns.append(col)

    print(len(df))


    for col in id_columns:
        df = df.drop(col, axis=1)
    PREDICT_COL = target
    ENCODING = []

    for col in df.columns:
        if not all(isinstance(x, (int, float)) for x in df[col]):
            lst = np.unique(df[col].astype(str))
            if col == PREDICT_COL:
                for i in range(len(lst)):
                    ENCODING.append((i, lst[i]))
            for i in range(len(lst)):
                df[col] = df[col].replace(lst[i], i)

    target = df.pop(PREDICT_COL)
    print(len(df))

    target = target.astype('int')
    df = df.astype('int')

    numeric_feature_names = [name for name in df.columns]
    numeric_features = df[numeric_feature_names]
    numeric_features.head()
    print(numeric_features.iloc[:3])
    tf.convert_to_tensor(numeric_features)

    normalizer = tf.keras.layers.Normalization(axis=-1)
    normalizer.adapt(numeric_features.to_numpy())
    numeric_features = pd.DataFrame(numeric_features)

    update_job_status(model_id, "Building Model")
    model = get_basic_model(normalizer, ENCODING, numeric_features)

    model_summary = []
    model.summary(print_fn=lambda x: model_summary.append(x))


    print(numeric_features.iloc[:3])
    print(target)
    history = model.fit(numeric_features.to_numpy(), target, epochs=EPOCHS, batch_size=BATCH_SIZE)

    model.save(f'./local/{user_id}/{model_id}/model', save_format='tf')

    update_job_status(model_id, "Completed")

    # Extract model name
    model_line = [line for line in model_summary if "Model:" in line][0]
    model_name = model_line.split("\"")[1]

    # Extract trainable params
    trainable_line = [line for line in model_summary if "Trainable params:" in line][0]
    trainable_params = trainable_line.split(":")[1].strip().split(" ")[0]
    final_accuracy = history.history['accuracy'][-1]

    # store data in firebase 
    document_ref = db.collection('models').document(model_id)
    data_to_add = {
        'model_type': model_name,
        'trainable_params': trainable_params,
        "final_accuracy": final_accuracy,
        "all_accuracy": history.history['accuracy'],
        "encoding": {str(item[0]): item[1] for item in ENCODING},
        "epochs": EPOCHS,
    }

    document_ref.update(data_to_add)

    return {"success": True}


def get_basic_model(normalizer, encoding, numeric_features):
    print(numeric_features)
    nodes = len(numeric_features) / (5 * (len(numeric_features.iloc[0]) + len(encoding)))
    res = 0
    for i in range(floor(nodes), 0, -1):
        if (i & (i - 1)) == 0:
            res = i
            break
    lst = [res]



    for i in range(3):
        res /= 2
        lst.append(res)

    if lst[0] < 64:
        lst = [64, 32, 16, 8]
    model = tf.keras.Sequential([
        normalizer,
        tf.keras.layers.Dense(lst[0], activation='relu'),
        tf.keras.layers.Dense(lst[1], activation='relu'),
        tf.keras.layers.Dropout(0.2),
        tf.keras.layers.Dense(lst[2], activation='relu'),
        tf.keras.layers.Dropout(0.2),
        tf.keras.layers.Dense(lst[3], activation='relu'),
        tf.keras.layers.Dropout(0.2),
        tf.keras.layers.Dense(len(encoding), activation='sigmoid')
    ])

    model.compile(optimizer='adam',
                  loss="sparse_categorical_crossentropy",  # tf.keras.losses.BinaryCrossentropy(from_logits=True)
                  metrics=['accuracy'])
    return model


def predict(df: pd.DataFrame, target, user_id, model_id):
    id_columns = []
    # check each column, if it increments by 1, it is an id column
    for col in df.columns:
        if df[col].is_monotonic_increasing:
            id_columns.append(col)

    for col in id_columns:
        df = df.drop(col, axis=1)

    for col in df.columns:
        if not all(isinstance(x, (int, float)) for x in df[col]):
            lst = np.unique(df[col].astype(str))
            for i in range(len(lst)):
                df[col] = df[col].replace(lst[i], i)

    df = df.drop(target, axis=1)
    df = df.astype('int')
    numeric_feature_names = [name for name in df.columns]
    numeric_features = df[numeric_feature_names]
    numeric_features.head()

    tf.convert_to_tensor(numeric_features)

    normalizer = tf.keras.layers.Normalization(axis=-1)
    normalizer.adapt(numeric_features.to_numpy())

    new_model = tf.keras.models.load_model(
        f'../backend/local/{user_id}/{model_id}/model')

    predictions = new_model.predict(np.array(numeric_features))

    # TODO: add a good return value.
    return {"predictions": predictions}
