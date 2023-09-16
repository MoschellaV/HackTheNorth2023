import React from "react";
import { Box } from "@mui/material";

export default function CenterWrapper({ children }) {
    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ width: { xs: "95vw", md: 1000 } }}>{children}</Box>
        </Box>
    );
}
