from firebase_admin import firestore

def update_job_status(doc_id, new_status):
    '''
    Updates a specific field 'status' in the document responsible for this analysis job.
    Takes in the document id and the new status to update to
    '''
    try:
        db = firestore.client() # get a Firestore client
        job_ref = db.collection('models').document(doc_id) # get the document reference
        job_ref.update({'status': new_status}) # update the status field

        print(f'Success updated job status to: {new_status}');
        return {"status": 200, "message": "OK"};

    except Exception as e:
        print(f"Error updating job status {e}");
        return {"status": 500, "message": e};