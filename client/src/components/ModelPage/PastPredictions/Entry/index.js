import { Box, Divider, Typography } from "@mui/material";
import React, { useState } from "react";
import moment from "moment";
import EntryModal from "./EntryModal";

export default function Entry({ prediction, mostRecentPrediction }) {
    const [open, setOpen] = useState(false);

    return (
        <Box>
            <EntryModal open={open} setOpen={setOpen} prediction={prediction} />
            <Box sx={{ my: 0.5 }} className={mostRecentPrediction === prediction.data.time && "backgroundAnimated"}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="p" component="p" sx={{ fontWeight: 500 }}>
                        {prediction.data.name}
                    </Typography>
                    {mostRecentPrediction === prediction.data.time && (
                        <>
                            <Box
                                sx={{
                                    borderRadius: "50%",
                                    backgroundColor: "#00CC00",
                                    width: 7,
                                    height: 7,
                                    mx: 0.5,
                                    ml: 1,
                                }}
                            />
                            <Typography variant="p" component="p" sx={{ fontWeight: 600, opacity: 0.5, fontSize: 14 }}>
                                Recent
                            </Typography>
                        </>
                    )}
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="p" component="p" sx={{ fontSize: 14, opacity: 0.4, fontWeight: 500 }}>
                        {moment(prediction.data.time).fromNow()}
                    </Typography>
                    <Typography
                        variant="p"
                        component="p"
                        sx={{ fontSize: 14, color: "#0F8CFF", textDecoration: "underline", cursor: "pointer" }}
                        onClick={() => setOpen(true)}
                    >
                        View Details
                    </Typography>
                </Box>
            </Box>
            <Divider />
        </Box>
    );
}
