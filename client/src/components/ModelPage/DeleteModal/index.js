import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { Box, Typography } from "@mui/material";
import { deleteDocument } from "../../../utils/DeleteDoc";
import { useNavigate } from "react-router-dom";

export default function DeleteModal({ modelId, openDeleteModal, setOpenDeleteModal }) {
    let navigate = useNavigate();

    const handleClose = () => {
        setOpenDeleteModal(false);
    };

    const onDelete = async () => {
        await deleteDocument("models", modelId);
        handleClose();
        return navigate("/your-models");
    };

    return (
        <div>
            <Dialog open={openDeleteModal} onClose={handleClose}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-around",
                        height: 220,
                        width: 400,
                        p: 2,
                    }}
                >
                    <Typography
                        variant="p"
                        component="p"
                        sx={{ textAlign: "center", fontSize: 20, fontWeight: 600, maxWidth: "70%" }}
                    >
                        Are you sure you want to delete this model?
                    </Typography>

                    <Typography
                        variant="p"
                        component="p"
                        sx={{ textAlign: "center", fontSize: 14, fontWeight: 600, opacity: 0.5, mb: 1 }}
                    >
                        There's no going back
                    </Typography>
                    <Box>
                        <Button
                            variant="outlined"
                            onClick={handleClose}
                            sx={{
                                textTransform: "none",
                                mr: 1,
                                color: "gray",
                                borderColor: "gray",
                                "&:hover": {
                                    borderColor: "black",
                                },
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            autoFocus
                            sx={{ textTransform: "none", ml: 1 }}
                            onClick={onDelete}
                        >
                            Delete
                        </Button>
                    </Box>
                </Box>
            </Dialog>
        </div>
    );
}
