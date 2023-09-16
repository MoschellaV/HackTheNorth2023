import React from "react";
import { Box, IconButton, Typography, Button, Divider } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function Step({ stepNum, description, isCompleted }) {
    return (
        <Box sx={{ my: 1 }}>
            <Divider />
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography component="p" variant="p" sx={{ my: 1, ml: 2, color: "#a6a6a6" }}>
                    Step {stepNum} - {description}
                </Typography>
                <Box sx={{ mr: 2 }}>
                    {isCompleted ? (
                        <CheckCircleIcon style={{ color: "#00C851" }} />
                    ) : (
                        <CheckCircleOutlineIcon style={{ color: "#cbcbcb" }} />
                    )}
                </Box>
            </Box>

            <Divider />
        </Box>
    );
}
