import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const getModelsByUserId = async (userId) => {
    try {
        const modelsCollection = collection(db, "models");

        const q = query(modelsCollection, where("uid", "==", userId));

        const querySnapshot = await getDocs(q);

        const models = [];
        querySnapshot.forEach((doc) => {
            models.push({ id: doc.id, ...doc.data() });
        });

        return models;
    } catch (error) {
        console.error("Error getting models:", error);
        throw error;
    }
};
