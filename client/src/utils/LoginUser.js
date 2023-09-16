import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

export const logInUser = async (email, password) => {
    // log in the user and handle error's
    // return appropriate message for each error
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        return { user: user, message: "success" };
    } catch (error) {
        if (error.code === "auth/user-not-found") {
            return { user: null, message: "No user found with this email!" };
        }

        if (error.code === "auth/wrong-password") {
            return { user: null, message: "Wrong password" };
        }

        if (error.code === "auth/invalid-email") {
            return { user: null, message: "That email address is invalid" };
        }

        return { user: null, message: "Unknown error occurred." };
    }
};
