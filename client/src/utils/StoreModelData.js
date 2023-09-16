import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const storeModelData = async (data) => {
    try {
        await setDoc(doc(db, "models", data.modelId), {
            modelId: data.modelId,
            status: data.status,
        });
    } catch (error) {
        console.error("Error storing user data:", error);
        throw new Error("Failed to store user data");
    }
};
