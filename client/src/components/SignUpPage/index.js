import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { signUpUser } from "../../utils/SignUpUser";
import { storeUserData } from "../../utils/StoreUserData";
import { Box, Button, CircularProgress, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
        setErrorMessage("");
        setLoading(true);
        if (!formData.email || !formData.password || !formData.confirmPassword) {
            setErrorMessage("Missing fields!");
            setLoading(false);
            return;
        }
        if (formData.confirmPassword !== formData.password) {
            setErrorMessage("Passwords do not match!");
            setLoading(false);
            return;
        }

        const signUpResponse = await signUpUser(formData.email, formData.password);
        if (signUpResponse.message === "success") {
            const data = {
                uid: signUpResponse.user.uid,
                email: signUpResponse.user.email,
                createdAt: signUpResponse.user.metadata.createdAt,
            };

            await storeUserData(data);

            setFormData((prevFormData) => ({
                ...prevFormData,
                email: "",
                password: "",
                confirmPassword: "",
            }));

            // redirect here
            return navigate("/train");
        } else {
            setErrorMessage(signUpResponse.message);
        }

        setLoading(false);
    };

    return (
        <>
            <Box
                component="main"
                sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        height: "60vh",
                        justifyContent: "space-evenly",
                    }}
                >
                    <Typography component="h2" variant="h2" sx={{ textAlign: "center" }}>
                        Sign Up!
                    </Typography>

                    {/* TAKE IN EMAIL */}
                    <TextField
                        id="email"
                        label="Email"
                        variant="outlined"
                        sx={{ width: 400 }}
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
                        sx={{ width: 400 }}
                        value={formData.password}
                        onChange={handleChange}
                    />

                    {/* CONFIRM PASSWORD */}
                    <TextField
                        id="confirmPassword"
                        label="Confirm Password"
                        type={showConfirmPassword ? "text" : "password"}
                        variant="outlined"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        edge="end"
                                    >
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={{ width: 400 }}
                        value={formData.confirmPassword}
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
                        Sign Up
                        {loading && <CircularProgress size={15} sx={{ ml: 1, color: "#000", opacity: 0.5 }} />}
                    </Button>

                    <Typography variant="p" component="p" sx={{ mt: 1, textAlign: "center" }}>
                        Already have an account?{" "}
                        <a href="/login" style={{ textDecoration: "underline", color: "blue" }}>
                            Login
                        </a>
                    </Typography>
                </Box>
            </Box>
        </>
    );
}
