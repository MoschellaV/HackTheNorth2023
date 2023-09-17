import React, { useEffect, useState } from "react";
import { Box, Divider, Typography, CircularProgress, IconButton } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import moment from "moment";

export default function Model({ model, shouldRefetch, setShouldRefetch }) {
    const [docStatus, setDocStatus] = useState(model.status);
    

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "completed":
                return "#00CC00"; // green
            case "building model":
                return "#1976D2"; // blue
            default:
                return "#9E9E9E"; // gray
        }
    };

    useEffect(() => {
        if (model.modelId) {
            const docRef = doc(db, "models", model.modelId);

            const unsubscribe = onSnapshot(docRef, (snapshot) => {
                const data = snapshot.data();
                setDocStatus(data.status);

                if (data.status === "Complete") {
                    setShouldRefetch(!shouldRefetch);
                }
            });

            return () => {
                unsubscribe();
            };
        }
    }, []);

    function formatDateFromUnix(unixTimestamp) {
        const dateMoment = moment.unix(unixTimestamp / 1000);
        const formattedDate = dateMoment.format("MMM Do, YYYY");
        return formattedDate;
    }

    return (
        <>
            <Divider />
            <Box sx={{ p: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box>
                    {docStatus === "Completed" ? (
                        <a href={`/your-models/${model.modelId}`}>
                            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                <Typography
                                    component="p"
                                    variant="h5"
                                    sx={{ fontSize: 30, textDecoration: "underline" }}
                                >
                                    {model.name}
                                </Typography>

                                <OpenInNewIcon style={{ fontSize: 35, marginLeft: 10 }} />
                            </Box>
                        </a>
                    ) : (
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                            <Typography component="p" variant="h5" sx={{ fontSize: 30, mr: 2 }}>
                                {model.name}
                            </Typography>
                            <CircularProgress style={{ width: 25, height: 25 }} />
                        </Box>
                    )}
                    <Typography component="p" variant="subtitle1" sx={{ fontWeight: 400, opacity: 0.5 }}>
                        Predicts {model.target}
                    </Typography>
                    <Typography component="p" variant="subtitle1" sx={{ fontWeight: 400, opacity: 0.5 }}>
                        {/* Id: {model.modelId} */}
                        Created on {formatDateFromUnix(model.createdAt)}
                    </Typography>
                </Box>

                <Box sx={{display: "flex", flexDirection: "col"}}>
                    {/* <IconButton aria-label="delete" size="small">
                        <MoreVertIcon fontSize="inherit" />
                    </IconButton> */}
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box
                            sx={{
                                borderRadius: "50%",
                                backgroundColor: getStatusColor(docStatus),
                                width: 10,
                                height: 10,
                                mr: 1,
                            }}
                        />
                        <Typography component="p" variant="subtitle1" sx={{ fontSize: 16 }}>
                            {docStatus}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Divider />
        </>
    );
}
