import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

export const signUpUser = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        return { user: user, message: "success" };
    } catch (error) {
        if (error.code === "auth/weak-password") {
            return { user: null, message: "Weak password. Please choose a stronger password." };
        }

        if (error.code === "auth/email-already-in-use") {
            return { user: null, message: "The email address is already in use by another account." };
        }

        if (error.code === "auth/invalid-email") {
            return { user: null, message: "Invalid email address." };
        }

        return { user: null, message: "Unknown error occurred." };
    }
};
