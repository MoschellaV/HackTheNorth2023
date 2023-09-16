import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Box, IconButton, Typography, Button, TextField } from "@mui/material";
import CenterWrapper from "../CenterWrapper";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ClearIcon from "@mui/icons-material/Clear";
import { findPotentialTargets } from "../../api/server";
import { useUserContext } from "../../context/UserContext";
import { v4 as uuidv4 } from "uuid";
import { storeModelData } from "../../utils/StoreModelData";
import FilePreview from "./FilePreview";
import Step from "./Step";
import SelectTarget from "./SelectTarget";
import NameModel from "./NameModel";

export default function TrainPage(props) {
    const { userData } = useUserContext();
    const [myFile, setMyFile] = useState();
    const [userHasUploadFile, setUserHasUploadFile] = useState(false); // step one check
    const [userHasSubmittedFile, setUserHasSubmittedFile] = useState(false); // step two check
    const [userHasSelectedTarget, setUserHasSelectedTarget] = useState(false); // step three check
    const [targetOptions, setTargetOptions] = useState([]);
    const [mlModelId, setMLModelId] = useState("");

    // for target
    const [target, setTarget] = useState("");
    const [inputValue, setInputValue] = useState("");

    const onDrop = useCallback((acceptedFile) => {
        setMyFile(acceptedFile);
        setUserHasUploadFile(true);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
    });

    const removeAll = () => {
        setMyFile();
    };

    function arrayToObjects(arr) {
        return arr.map((label) => ({ label }));
    }
    useEffect(() => {
        console.log(target);
    }, [target]);

    const submitFile = async () => {
        const formData = new FormData();
        formData.append("file", myFile[0]);
        const modelId = `model_${uuidv4()}`;
        setMLModelId(modelId);

        const data = {
            uid: userData.uid,
            modelId: modelId,
            status: "Analyzing",
        };

        await storeModelData(data);

        findPotentialTargets(formData, userData.uid, modelId)
            .then((res) => {
                if (res.status === 200) {
                    setTargetOptions(arrayToObjects(res.data.columns));
                    setUserHasSubmittedFile(true);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    console.log(mlModelId);
    return (
        <CenterWrapper>
            <Box sx={{ my: 5 }}>
                {/* TITLE */}
                <Typography variant="h3" component="h3" sx={{ my: 3 }}>
                    Generate Model
                </Typography>
                {/* STEP 1 */}
                <Step stepNum={"1"} description={"Upload your dataset!"} isCompleted={userHasUploadFile} />
                {!myFile && (
                    <>
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
                    </>
                )}
                {/* STEP 2 */}
                <Step stepNum={"2"} description={"We'll analyze your data"} isCompleted={userHasSubmittedFile} />
                {myFile && !userHasSubmittedFile && (
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
                                <IconButton aria-label="remove file" sx={{ color: "#000", mr: 2 }} onClick={removeAll}>
                                    <ClearIcon />
                                </IconButton>
                            </Box>
                        </Box>
                        <FilePreview file={myFile[0]} />
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{ mt: 2, textTransform: "none" }}
                            onClick={submitFile}
                        >
                            Analyze
                        </Button>
                    </>
                )}
                {/* STEP 3 */}
                <Step
                    stepNum={"3"}
                    description={"Choose the variable you'd like to predict"}
                    isCompleted={userHasSelectedTarget}
                />
                {userHasSubmittedFile && !userHasSelectedTarget && (
                    <SelectTarget
                        options={targetOptions}
                        target={target}
                        setTarget={setTarget}
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        setUserHasSelectedTarget={setUserHasSelectedTarget}
                    />
                )}
                <Step stepNum={"4"} description={"Create your machine model"} isCompleted={false} />
                {userHasSelectedTarget && <NameModel mlModelId={mlModelId} target={target} />}
            </Box>
        </CenterWrapper>
    );
}
