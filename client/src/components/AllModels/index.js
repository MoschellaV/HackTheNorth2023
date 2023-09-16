import React, { useEffect, useState } from "react";
import CenterWrapper from "../CenterWrapper";
import { Box, CircularProgress, Typography, Button } from "@mui/material";
import Model from "./Model";
import { getModelsByUserId } from "../../utils/FetchAllModels";
import { useUserContext } from "../../context/UserContext";

export default function AllModels() {
    const { userData } = useUserContext();
    const [models, setModels] = useState([]);
    const [loading, setLoading] = useState(false);
    const [shouldRefetch, setShouldRefetch] = useState("");

    useEffect(() => {
        setLoading(true);
        getModelsByUserId(userData.uid)
            .then((data) => {
                const sortedData = data.sort((a, b) => b.createdAt - a.createdAt);
                setModels(sortedData);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching models:", error);
                setLoading(false);
            });
    }, []);

    return (
        <CenterWrapper>
            <Box sx={{ my: 5 }}>
                <Typography variant="h3" component="h3" sx={{ my: 3 }}>
                    Your Machine Models
                </Typography>
                {!loading ? (
                    models.length > 0 ? (
                        models.map((model) => (
                            <Model
                                key={model.modelId}
                                model={model}
                                shouldRefetch={shouldRefetch}
                                setShouldRefetch={setShouldRefetch}
                            />
                        ))
                    ) : (
                        <>
                            <Typography variant="p" component="p" sx={{ mb: 2, opacity: 0.5, fontSize: 24 }}>
                                Looks like you haven't created any machine models
                            </Typography>
                            <a href="/train" target="_blank">
                                <Button variant="contained" sx={{ textTransform: "none" }}>
                                    Create your first
                                </Button>
                            </a>
                        </>
                    )
                ) : (
                    <CircularProgress />
                )}
            </Box>
        </CenterWrapper>
    );
}
