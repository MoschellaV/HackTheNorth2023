import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { Route, redirect } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (data) => {
            if (data) {
                // user is signed in
                const updatedUserData = {
                    uid: data.uid,
                    email: data.email,
                    createdAt: data.metadata.createdAt,
                };

                setUser(updatedUserData);
            } else {
                // user is signed out
                const updatedUserData = {
                    id: null,
                    email: null,
                };

                setUser(updatedUserData);
                // router.push("/login");
                redirect("/train");
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        // user is authenticated
        <Route {...rest} render={({ location }) => (user ? children : null)} />
    );
};

export default PrivateRoute;
