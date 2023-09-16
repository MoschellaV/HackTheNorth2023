import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import theme from "./context/theme";
import { UserContextProvider } from "./context/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <UserContextProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </UserContextProvider>
        </ThemeProvider>
    </React.StrictMode>
);
