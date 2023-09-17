import React, { useEffect, useState } from "react";
import CenterWrapper from "../CenterWrapper";
import { Box, CircularProgress, Typography, Button, IconButton } from "@mui/material";
import Model from "./Model";
import { getModelsByUserId } from "../../utils/FetchAllModels";
import { useUserContext } from "../../context/UserContext";
import AddIcon from "@mui/icons-material/Add";

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
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="h3" component="h3" sx={{ my: 3 }}>
                        Your Machine Models
                    </Typography>

                    <a href="/train">
                        <Button sx={{ textTransform: "none", color: "gray" }}>
                            <AddIcon fontSize="medium" />
                            <Typography component="p" variant="p" sx={{ ml: 1, fontSize: 20 }}>
                                New Model
                            </Typography>
                        </Button>
                    </a>
                </Box>
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
                        <Typography variant="p" component="p" sx={{ mt: 2, opacity: 0.5, fontSize: 24 }}>
                            Looks like you haven't created any machine models
                        </Typography>
                    )
                ) : (
                    <CircularProgress />
                )}
            </Box>
        </CenterWrapper>
    );
}
