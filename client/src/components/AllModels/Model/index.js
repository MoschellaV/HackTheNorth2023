import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export default function Model({ model }) {
    return (
        <>
            <Divider />
            <Box sx={{ p: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box>
                    <a href={`/your-model/${model.modelId}`}>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                            <Typography component="p" variant="h5" sx={{ fontSize: 30, textDecoration: "underline" }}>
                                {model.name}
                            </Typography>

                            <OpenInNewIcon style={{ fontSize: 35, marginLeft: 10 }} />
                        </Box>
                    </a>
                    <Typography component="p" variant="subtitle1" sx={{ fontWeight: 400, opacity: 0.5 }}>
                        Predicts: {model.target}
                    </Typography>
                    <Typography component="p" variant="subtitle1" sx={{ fontWeight: 400, opacity: 0.5 }}>
                        Id: {model.modelId}
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box sx={{ borderRadius: "50%", backgroundColor: "#00C851", width: 10, height: 10, mr: 1 }} />
                    <Typography component="p" variant="subtitle1">
                        {model.status}
                    </Typography>
                </Box>
            </Box>
            <Divider />
        </>
    );
}
