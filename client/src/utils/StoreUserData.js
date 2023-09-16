import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const storeUserData = async (data) => {
    try {
        await setDoc(doc(db, "users", data.uid), {
            uid: data.uid,
            email: data.email,
            createdAt: data.createdAt,
        });
    } catch (error) {
        console.error("Error storing user data:", error);
        throw new Error("Failed to store user data");
    }
};
