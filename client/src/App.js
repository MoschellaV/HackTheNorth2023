import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./middleware/PrivateRoute";
import SignUpPage from "./components/SignUpPage";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import TrainPage from "./components/TrainPage";

function App() {
    return (
        <main>
            <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="signup" element={<SignUpPage />} />
                <Route path="login" element={<LoginPage />} />

                <Route
                    path="train"
                    element={
                        <PrivateRoute>
                            <TrainPage />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </main>
    );
}

export default App;
