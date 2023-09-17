import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const getSubcollectionDocs = async (collectionName, docId, subcollectionName) => {
    try {
        // const colRef = collection(db, collectionName);
        // const docRef = doc(colRef, )
        const docRef = doc(db, collectionName, docId);
        const subcollectionRef = collection(docRef, subcollectionName);
        // const docRef = collection(db, collectionName).doc(db, docId);
        // const subcollectionRef = collection(docRef, subcollectionName);

        const querySnapshot = await getDocs(subcollectionRef);

        const subcollectionDocs = [];
        querySnapshot.forEach((doc) => {
            subcollectionDocs.push({
                id: doc.id,
                data: doc.data(),
            });
        });

        return subcollectionDocs;
    } catch (error) {
        console.error("Error getting subcollection documents: ", error);
        throw error;
    }
};
