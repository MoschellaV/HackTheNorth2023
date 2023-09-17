import { Box, Button, Divider, Typography } from "@mui/material";
import React from "react";
import Entry from "./Entry";

export default function PastPredictions({ predictions, mostRecentPrediction }) {
    return (
        <Box
            sx={{
                boxShadow: "0px 2px 9px rgba(0, 0, 0, 0.25)",
                borderRadius: 3,
                width: "100%",
                my: 1,
                p: 3,
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="h5" component="p" sx={{ fontWeight: 500 }}>
                    Past Predictions
                </Typography>
                {/* <Button variant="outlined" sx={{ textTransform: "none" }}>
                    Expand
                </Button> */}
            </Box>
            <Divider />
            {predictions.length > 0 ? (
                predictions.map((prediction, index) => {
                    return <Entry prediction={prediction} mostRecentPrediction={mostRecentPrediction} key={index} />;
                })
            ) : (
                <Typography component="p" variant="p" sx={{ my: 2, opacity: 0.5, fontWeight: 500 }}>
                    No predictions have been made with this model
                </Typography>
            )}
        </Box>
    );
}
