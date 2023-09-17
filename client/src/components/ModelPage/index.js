import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDocument } from "../../utils/FetchDoc";
import { Box, Button, Typography, CircularProgress, Menu, MenuItem } from "@mui/material";
import CenterWrapperWide from "../CenterWrapperWide";
import PredictionStats from "./PredictionStats";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteModal from "./DeleteModal";
import DataObjectIcon from "@mui/icons-material/DataObject";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";

export default function ModelPage() {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const openAnchor = Boolean(anchorEl);
    const handleClickDropdown = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseDropdown = () => {
        setAnchorEl(null);
    };

    let params = useParams();

    useEffect(() => {
        setLoading(true);
        const getDocData = async () => {
            const res = await fetchDocument("models", params.modelId);
            console.log(res);
            setData(res);
            setLoading(false);
        };
        getDocData();
    }, [params.modelId]);

    return data ? (
        <>
            <DeleteModal
                modelId={data.modelId}
                openDeleteModal={openDeleteModal}
                setOpenDeleteModal={setOpenDeleteModal}
            />
            <CenterWrapperWide>
                <Box sx={{ my: 5 }}>
                    <Typography component="p" variant="body1" sx={{ fontSize: 16 }}>
                        Model
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Box>
                            <Typography component="h2" variant="h2">
                                {data.name}
                            </Typography>
                        </Box>

                        {/* CREATE MODEL */}
                        <Box>
                            <Button
                                variant="outlined"
                                sx={{
                                    textTransform: "none",
                                    color: "gray",
                                    borderColor: "gray",
                                    "&:hover": {
                                        borderColor: "black",
                                    },
                                }}
                                onClick={handleClickDropdown}
                            >
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <AddIcon sx={{ fontSize: 20, mr: 1 }} />
                                    <Typography
                                        component="p"
                                        variant="p"
                                        sx={{ fontWeight: 600, width: "100%", fontSize: 16 }}
                                    >
                                        Make Prediction
                                    </Typography>
                                </Box>
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={openAnchor}
                                onClose={handleCloseDropdown}
                                MenuListProps={{
                                    "aria-labelledby": "basic-button",
                                }}
                            >
                                <MenuItem onClick={handleCloseDropdown}>
                                    <TextSnippetIcon sx={{ mr: 1 }} /> Upload CSV
                                </MenuItem>
                                <MenuItem onClick={handleCloseDropdown}>
                                    <DataObjectIcon sx={{ mr: 1 }} /> Enter JSON
                                </MenuItem>
                            </Menu>

                            {/* DELETE MODAL */}
                            <Button
                                variant="outlined"
                                sx={{
                                    textTransform: "none",
                                    color: "gray",
                                    borderColor: "gray",
                                    "&:hover": {
                                        borderColor: "black",
                                    },
                                    ml: 2,
                                }}
                                onClick={() => {
                                    setOpenDeleteModal(true);
                                }}
                            >
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <DeleteIcon sx={{ fontSize: 20, mr: 1 }} />
                                    <Typography
                                        component="p"
                                        variant="p"
                                        sx={{ fontWeight: 600, width: "100%", fontSize: 16 }}
                                    >
                                        Delete Model
                                    </Typography>
                                </Box>
                            </Button>
                        </Box>
                    </Box>
                    <PredictionStats data={data} />
                </Box>
            </CenterWrapperWide>
        </>
    ) : (
        <CircularProgress />
    );
}
