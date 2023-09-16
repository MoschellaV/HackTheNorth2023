import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { postTarget } from "../../../api/server";
import { useUserContext } from "../../../context/UserContext";
import { updateDocField } from "../../../utils/UpdateDocField";
import { useNavigate } from "react-router-dom";
import moment from "moment";

export default function NameModel(mlModelId, target) {
    let navigate = useNavigate();
    const { userData } = useUserContext();
    const [name, setName] = useState("");
    const [error, setError] = useState(false);

    const createModel = async () => {
        if (!name) {
            setError(true);
            return;
        }

        // store name
        await updateDocField("models", mlModelId.mlModelId, "name", name);

        // store target
        await updateDocField("models", mlModelId.mlModelId, "target", mlModelId.target.label);

        // store time
        const currentTimeUnix = moment().valueOf();
        await updateDocField("models", mlModelId.mlModelId, "createdAt", currentTimeUnix);

        postTarget(mlModelId.target.label, userData.uid, mlModelId.mlModelId);
        return navigate("/your-models");
        // .then((res) => {
        //     if (res.status === 200) {
        //         // setTargetOptions(arrayToObjects(res.data.columns));
        //         // setUserHasSubmittedFile(true);
        //         console.log("success");
        //         r
        //     }
        // })
        // .catch((err) => {
        //     console.error(err);
        // });
    };

    return (
        <Box sx={{ mx: 2 }}>
            <TextField
                error={error}
                label="Name your model"
                variant="standard"
                sx={{
                    width: "30%",
                    color: error ? "red" : "inherit",
                }}
                onChange={(e) => setName(e.target.value)}
                helperText={error ? "Please name your ML model!" : ""}
            />

            <Button variant="contained" fullWidth sx={{ mt: 2, textTransform: "none" }} onClick={createModel}>
                Generate Model
            </Button>
        </Box>
    );
}
