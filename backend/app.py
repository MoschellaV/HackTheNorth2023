from fastapi import FastAPI, File, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import os
from pydantic import BaseModel
import numpy as np
import tensorflow as tf

app = FastAPI()


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

    return {"columns": header}


@app.post("/api/train/{user_id}/{model_id}")
async def train_model(user_id: str, model_id: str, target: Train):
    df = os.path.join(".", "local", user_id, model_id, "data.csv")
    df = pd.read_csv(df)

    data = train(df, target.target, user_id, model_id)

    # TODO: add actual train func

    # call train function
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
    predict(df, target, user_id, model_id)


@app.post("/api/predict/{user_id}/{model_id}/json")
async def upload_json_predict(user_id: str, model_id: str, file: UploadFile = File(...)):
    pass


# GET ALL MODELS FOR USER_ID
@app.get("/api/models/{user_id}")
async def get_models(user_id: str):
    # check if local directory exists or local/user_id exists
    if not os.path.exists("local") and not os.path.exists(os.path.join("local", user_id)):
        return {"error": "No models found."}

    # get all models for user_id
    models = os.listdir(os.path.join("local", user_id))

    return {"models": models}


def train(df, target, user_id, model_id):
    SHUFFLE_BUFFER = 500
    BATCH_SIZE = 32
    EPOCHS = 90

    REMOVED_COL = "BookingID"
    PREDICT_COL = "BookingStatus"
    ENCODING = []

    df = df.drop(REMOVED_COL, axis=1)  # axis: 0 for row, 1 for column

    for col in df.columns:
        if not all(isinstance(x, (int, float)) for x in df[col]):
            lst = np.unique(df[col].astype(str))
            if col == PREDICT_COL:
                for i in range(len(lst)):
                    ENCODING.append((i, lst[i]))
            for i in range(len(lst)):
                df[col] = df[col].replace(lst[i], i)

    target = df.pop(PREDICT_COL)

    target = target.astype('int')
    df = df.astype('int')

    numeric_feature_names = [name for name in df.columns]
    numeric_features = df[numeric_feature_names]
    numeric_features.head()
    tf.convert_to_tensor(numeric_features)

    normalizer = tf.keras.layers.Normalization(axis=-1)
    normalizer.adapt(numeric_features.to_numpy())
    numeric_features = pd.DataFrame(numeric_features)

    model = get_basic_model(normalizer, ENCODING)

    # with open(f'./local/{user_id}/{model_id}/' + 'model.txt', 'w') as fh:
    #     model.summary(print_fn=lambda x: fh.write(x + '\n'))

    model_summary = []
    model.summary(print_fn=lambda x: model_summary.append(x))
    print(model_summary)

    history = model.fit(numeric_features.to_numpy(), target, epochs=EPOCHS, batch_size=BATCH_SIZE)

    model.save(f'./local/{user_id}/{model_id}/model.h5')

    # epochs directly relate to the amount of numbers inside of the accuracy list
    return {"model_summary": model_summary, "encoding": ENCODING, "epochs": EPOCHS, "batches": BATCH_SIZE,
            "predicted_column": PREDICT_COL, "accuracy": history.history['accuracy']}


def get_basic_model(normalizer, encoding):
    model = tf.keras.Sequential([
        normalizer,
        tf.keras.layers.Dense(128, activation='relu'),
        tf.keras.layers.Dense(64, activation='relu'),
        tf.keras.layers.Dropout(0.2),
        tf.keras.layers.Dense(32, activation='relu'),
        tf.keras.layers.Dropout(0.2),
        tf.keras.layers.Dense(10, activation='relu'),
        tf.keras.layers.Dropout(0.2),
        tf.keras.layers.Dense(len(encoding), activation='sigmoid')
    ])

    model.compile(optimizer='adam',
                  loss="sparse_categorical_crossentropy",  # tf.keras.losses.BinaryCrossentropy(from_logits=True)
                  metrics=['accuracy'])

    return model

def predict(df: pd.DataFrame):
    pass
