import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../firebase/firebase";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
    let navigate = useNavigate();
    const { userData, setUserData } = useUserContext();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (data) => {
            if (data) {
                // user is signed in
                const updatedUserData = {
                    uid: data.uid,
                    email: data.email,
                    createdAt: data.metadata.createdAt,
                };

                setUserData(updatedUserData);
            } else {
                setUserData(null);
                return navigate("/");
            }
        });

        return () => unsubscribe();
    }, []);

    return userData && children;
};

export default PrivateRoute;
