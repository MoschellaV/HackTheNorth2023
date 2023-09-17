import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { signUpUser } from "../../utils/SignUpUser";
import { storeUserData } from "../../utils/StoreUserData";
import { Box, Button, CircularProgress, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./signup.css"; 
import logo from "../../DropModel-T.png";

export default function SignUpPage() {
    let navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: value,
        }));
    };

    const handleSubmit = async () => {
        // ... (remaining code remains the same)
    };

    return (
        <div className="signup-page">
            <div className="blue-side">
                <div className="blue-rectangle">
                    <div className="content-active">
                            <br />
                            <div class = "logo-div"><a className = "logo"class="inline-flex items-center gap-x-6 text-6xl font-bold dark:text-white" href="#">
                            <img class="w-22 h-auto" src={logo} alt="Logo"></img>
                            DropModel
                        </a></div>
                        <p>
                            Welcome, we're glad you're here!
                        </p>
                    </div>
                </div>
            </div>
            <div className="white-side">
                <div className="signup-form">
                    <Typography component="h2" variant="h2" sx={{ textAlign: "center", color: "#0c3c72" }}>
                        Register Here:
                    </Typography>
                    {/* TAKE IN EMAIL */}
                    <TextField
                        id="email"
                        label="Email"
                        variant="outlined"
                        sx={{ width: 400, alignSelf: "center" }}
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {/* ... (other input fields) */}
                    {errorMessage && (
                        <Typography variant="p" component="p" sx={{ color: "red", textAlign: "center", alignSelf: "center" }}>
                            {errorMessage}
                        </Typography>
                    )}
                    <Button
                        variant="contained"
                        sx={{ width: 400, height: 46, textTransform: "none", borderRadius: 8 , alignSelf: "center", backgroundColor: "#4696b6"}}
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        Sign Up
                        {loading && <CircularProgress size={15} sx={{ ml: 1, color: "#4696b6", opacity: 0.25,alignSelf: "center" }} />}
                    </Button>
                    <Typography variant="p" component="p" sx={{ mt: 1, textAlign: "center" ,alignSelf: "center"}}>
                        Already have an account?{" "}
                        <a href="/login" style={{ textDecoration: "underline", color: "#4696b6" ,alignSelf: "center"}}>
                            Login
                        </a>
                    </Typography>
                </div>
            </div>
        </div>
    );
}
