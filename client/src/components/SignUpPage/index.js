
import "./signup.css"; 
import logo from "../../DropModel-T.png";
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
            <div className="form-container">
    <Typography component="h2" variant="h2" sx={{ textAlign: "center", color: "#0c3c72", marginBottom: 5 }}>
        Register Here:
    </Typography>
    <TextField
        id="email"
        label="Email"
        variant="outlined"
        sx={{ width: 400, marginBottom: 5 }} // Adjust marginBottom for spacing
        value={formData.email}
        onChange={handleChange}
    />

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
        sx={{ width: 400, marginBottom: 5 }} // Adjust marginBottom for spacing
        value={formData.password}
        onChange={handleChange}
    />

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
        sx={{ width: 400, marginBottom:0 }} // Keep marginBottom larger for the last textbox
        value={formData.confirmPassword}
        onChange={handleChange}
    />

    <Button
        variant="contained"
        sx={{ width: 400, height: 46, marginTop: 10, marginBottom: 0, textTransform: "none", borderRadius: 8, alignSelf: "center", backgroundColor: "#4696b6" }}
        onClick={handleSubmit}
        disabled={loading}
    >
        Sign Up
        {loading && <CircularProgress size={15} sx={{ ml: 1, color: "#4696b6", opacity: 0.25, alignSelf: "center" }} />}
    </Button>
    <Typography variant="p" component="p" sx={{ mt: 1, textAlign: "center" }}>
                        Already have an account?{" "}
                        <a href="/login" style={{ textDecoration: "underline", color: "blue" }}>
                            Login
                        </a>
                    </Typography>

</div>
            </div>
        </div>
    );
}
