import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, CircularProgress, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { logInUser } from "../../utils/LoginUser";
import { useNavigate } from "react-router-dom";
import "./login.css";
import logo from "../../DropModel-T.png";

export default function LoginPage() {
    let navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
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
        setErrorMessage("");
        setLoading(true);
        if (!formData.email || !formData.password) {
            setErrorMessage("Missing fields!");
            setLoading(false);
            return;
        }

        const loginResponse = await logInUser(formData.email, formData.password);
        if (loginResponse.message === "success") {
            setFormData((prevFormData) => ({
                ...prevFormData,
                email: "",
                password: "",
                confirmPassword: "",
            }));

            // redirect here
            return navigate("/train");
        } else {
            setErrorMessage(loginResponse.message);
        }

        setLoading(false);
    };

    return (
        <div className="signup-page">
            <div className="blue-side">
                <div className="blue-rectangle">
                    <div className="content-active">
                        <br />
                        <div className="logo-div">
                            <a className="logo inline-flex items-center gap-x-6 text-6xl font-bold dark:text-white" href="/">
                                <img className="w-22 h-auto" src={logo} alt="Logo"></img>
                                DropModel
                            </a>
                        </div>
                        <p>
                            Welcome back! Ready to train some models?
                        </p>
                    </div>
                </div>
            </div>
            <div className="login-container">
                <Box
                    component="main"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                    }}
                >
                    <Typography component="h2" variant="h2" sx={{ textAlign: "center", color: "#0c3c72" }}>
                        Login
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <Typography component="p" variant="body1" sx={{ textAlign: "center", ml: 1 }}>
                        </Typography>
                    </Box>

                    {/* TAKE IN EMAIL */}
                    <TextField
                        id="email"
                        label="Email"
                        variant="outlined"
                        sx={{ width: 400, marginBottom: 5}}
                        value={formData.email}
                        onChange={handleChange}
                    />

                    {/* TAKE IN PASSWORD */}
                    <TextField
                        id="password"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        variant="outlined"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={{ width: 400, marginBottom: 5}}
                        value={formData.password}
                        onChange={handleChange}
                    />

                    {errorMessage && (
                        <Typography variant="p" component="p" sx={{ color: "red", textAlign: "center" }}>
                            {errorMessage}
                        </Typography>
                    )}

                    <Button
                        variant="contained"
                        sx={{ width: 400, height: 46, textTransform: "none", borderRadius: 8 }}
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        Login
                        {loading && <CircularProgress size={15} sx={{ ml: 1, color: "#000", opacity: 0.5 }} />}
                    </Button>

                    <Typography variant="p" component="p" sx={{ mt: 1, textAlign: "center" }}>
                        Need an account?{" "}
                        <a href="/signup" style={{ textDecoration: "underline", color: "blue" }}>
                            Sign Up
                        </a>
                    </Typography>
                </Box>
            </div>
        </div>
    );
}
