from fastapi import FastAPI, File, Form, UploadFile
import pandas as pd
import os

app = FastAPI()


# UPLOAD CSV FILE AND RETURN POSSIBLE COLUMNS
@app.post("/api/upload/{user_id}/{model_id}")
async def upload_csv(user_id: str, model_id: str, file: UploadFile = File(...), delimiter: str = Form(',')):

    if not delimiter:
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


# GET ALL MODELS FOR USER_ID
@app.get("/api/models/{user_id}")
async def get_models(user_id: str):
    # check if local directory exists or local/user_id exists
    if not os.path.exists("local") or not os.path.exists(os.path.join("local", user_id)):
        return {"error": "No models found."}
    
    # get all models for user_id
    models = os.listdir(os.path.join("local", user_id))

    return {"models": models}
