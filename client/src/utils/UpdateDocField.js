import { db } from "../firebase/firebase";
import { updateDoc, doc } from "firebase/firestore";

export const updateDocField = async (collection, docName, field, value) => {
    const userRef = doc(db, collection, docName);

    await updateDoc(userRef, {
        [field]: value,
    });
};
