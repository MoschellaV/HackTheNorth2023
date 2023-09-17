import { db } from "../firebase/firebase";
import { collection, doc, setDoc } from "firebase/firestore";

export const createSubcollection = async (collectionName, docId, subcollectionName, docName, data) => {
    try {
        const docRef = doc(db, collectionName, docId);
        const subcollectionRef = collection(docRef, subcollectionName);

        await setDoc(doc(subcollectionRef, docName), data);

        console.log(
            `Document added to ${subcollectionName} in ${collectionName}/${docId} with custom document name: ${docName}`
        );
    } catch (error) {
        console.error("Error adding document: ", error);
    }
};
