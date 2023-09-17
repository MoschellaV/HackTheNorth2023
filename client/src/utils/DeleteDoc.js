import { db } from "../firebase/firebase";
import { doc, deleteDoc } from "firebase/firestore";

export const deleteDocument = async (collectionName, documentName) => {
    try {
        await deleteDoc(doc(db, collectionName, documentName));
    } catch (error) {
        console.error("Error deleting document:", error);
        throw error;
    }
};
