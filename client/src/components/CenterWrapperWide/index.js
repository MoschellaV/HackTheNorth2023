import React from "react";
import { Box } from "@mui/material";

export default function CenterWrapperWide({ children }) {
    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ width: { xs: "95vw", md: 1200 } }}>{children}</Box>
        </Box>
    );
}
