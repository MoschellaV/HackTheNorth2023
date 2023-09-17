import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export const fetchDocument = async (collectionName, documentName) => {
    const docRef = doc(db, collectionName, documentName);

    try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists) {
            return docSnap.data();
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching document:", error);
        throw error;
    }
};
