import React, { useState, useCallback } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDropzone } from "react-dropzone";
import { IconButton, TextField } from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ClearIcon from "@mui/icons-material/Clear";
import { predictCSV } from "../../../api/server";
import { useUserContext } from "../../../context/UserContext";
import { countMaxIndices } from "../../../utils/DataAggregation/CountOptionFrequency";
import { v4 as uuidv4 } from "uuid";
import { createSubcollection } from "../../../utils/CreateSubCollection";
import moment from "moment";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

export default function PredictionCSVModal({
    setMostRecentPrediction,
    shouldRefetch,
    setShouldRefetch,
    encoding,
    target,
    modelId,
    openCSVModal,
    setOpenCSVModal,
}) {
    const { userData } = useUserContext();
    const handleClose = () => setOpenCSVModal(false);
    const [myFile, setMyFile] = useState();
    const [name, setName] = useState("");
    const [error, setError] = useState(false);

    const onDrop = useCallback((acceptedFile) => {
        setMyFile(acceptedFile);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
    });

    const removeAll = () => {
        setMyFile();
    };

    const submitPrediction = async () => {
        if (!name) {
            setError(true);
            return;
        }

        const formData = new FormData();
        formData.append("file", myFile[0]);
        formData.append("target", target);
        formData.append("encoding", encoding);

        predictCSV(formData, userData.uid, modelId)
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data);
                    const predictionId = `prediction_${uuidv4()}`;
                    const currentTimeUnix = moment().valueOf();

                    const predictionData = {
                        name: name,
                        predictionId: predictionId,
                        time: currentTimeUnix,
                        // add the rest of the data here
                    };

                    createSubcollection("models", modelId, "predictions", predictionId, predictionData);
                    setShouldRefetch(!shouldRefetch);
                    setMostRecentPrediction(currentTimeUnix);
                    handleClose();
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <div>
            <Modal
                open={openCSVModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="p" component="p" sx={{ textAlign: "center", fontSize: 20, fontWeight: 600 }}>
                        Upload a CSV
                    </Typography>
                    {!myFile ? (
                        <div {...getRootProps({ className: "dropzone" })}>
                            <Box
                                sx={{
                                    width: "100%",
                                    height: 300,
                                    backgroundColor: "#f2f2f2",
                                    borderRadius: 5,
                                    border: "3px dashed #cbcbcb",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                    my: 2,
                                }}
                            >
                                <input {...getInputProps()} />

                                <Typography component="p" variant="p">
                                    To make predictions on <span style={{ textDecoration: "underline" }}>{target}</span>{" "}
                                    attach a dataset
                                </Typography>
                            </Box>
                        </div>
                    ) : (
                        <>
                            <Box
                                sx={{
                                    my: 2,
                                    width: "100%",
                                    height: 120,
                                    backgroundColor: "#f2f2f2",
                                    borderRadius: 5,
                                    border: "3px dashed #cbcbcb",
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <Box
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        width: "100%",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Box sx={{ ml: 2 }} style={{ display: "flex", alignItems: "center", opacity: 0.7 }}>
                                        <InsertDriveFileIcon style={{ fontSize: 50 }} />
                                        <Box sx={{ ml: 2 }}>
                                            <Typography variant="p" component="p">
                                                {myFile[0].path}
                                            </Typography>
                                            <Typography variant="subtitle1" component="p">
                                                {myFile[0].size} bytes
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <IconButton
                                        aria-label="remove file"
                                        sx={{ color: "#000", mr: 2 }}
                                        onClick={removeAll}
                                    >
                                        <ClearIcon />
                                    </IconButton>
                                </Box>
                            </Box>

                            {/* NAMING PREDICTION */}
                            <TextField
                                error={error}
                                label="Name your prediction"
                                variant="standard"
                                sx={{
                                    width: "30%",
                                    color: error ? "red" : "inherit",
                                }}
                                onChange={(e) => setName(e.target.value)}
                                helperText={error ? "Please name your prediction!" : ""}
                            />

                            <Button
                                variant="contained"
                                fullWidth
                                sx={{ mt: 2, textTransform: "none" }}
                                onClick={submitPrediction}
                            >
                                Predict
                            </Button>
                        </>
                    )}
                </Box>
            </Modal>
        </div>
    );
}
