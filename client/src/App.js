import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./middleware/PrivateRoute";
import SignUpPage from "./components/SignUpPage";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import TrainPage from "./components/TrainPage";
import AllModels from "./components/AllModels";
import ModelPage from "./components/ModelPage";


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
                <Route
                    path="your-models"
                    element={
                        <PrivateRoute>
                            <AllModels />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="your-models/:modelID"
                    element={
                        <PrivateRoute>
                            <ModelPage />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </main>
    );
}

export default App;
