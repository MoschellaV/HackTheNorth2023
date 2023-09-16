import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Box, IconButton, Typography, Button } from "@mui/material";
import CenterWrapper from "../CenterWrapper";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ClearIcon from "@mui/icons-material/Clear";
import { findPotentialTargets } from "../../api/server";
import { useUserContext } from "../../context/UserContext";
import { v4 as uuidv4 } from "uuid";

export default function TrainPage(props) {
    const [myFile, setMyFile] = useState();
    const { userData } = useUserContext();

    const onDrop = useCallback((acceptedFile) => {
        setMyFile(acceptedFile);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
    });

    const removeAll = () => {
        setMyFile();
    };

    const submitFile = () => {
        const formData = new FormData();
        formData.append("file", myFile[0]);
        const modelId = `model_${uuidv4()}`;

        findPotentialTargets(formData, userData.uid, modelId)
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <CenterWrapper>
            <Box sx={{ my: 10 }}>
                <section className="container">
                    {!myFile ? (
                        <div {...getRootProps({ className: "dropzone" })}>
                            <Box
                                sx={{
                                    width: "100%",
                                    height: 500,
                                    backgroundColor: "#f2f2f2",
                                    borderRadius: 5,
                                    border: "3px dashed #cbcbcb",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                }}
                            >
                                <input {...getInputProps()} />
                                <Typography component="p" variant="p">
                                    Drag 'n' drop your dataset!
                                </Typography>
                            </Box>
                        </div>
                    ) : (
                        <>
                            <Box
                                sx={{
                                    width: "100%",
                                    height: 200,
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
                                    <Box sx={{ ml: 5 }} style={{ display: "flex", alignItems: "center", opacity: 0.7 }}>
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
                                        sx={{ color: "#000", mr: 4 }}
                                        onClick={removeAll}
                                    >
                                        <ClearIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                            <Button
                                variant="contained"
                                fullWidth
                                sx={{ mt: 4, textTransform: "none" }}
                                onClick={submitFile}
                            >
                                Analyze
                            </Button>
                        </>
                    )}
                </section>
            </Box>
        </CenterWrapper>
    );
}
