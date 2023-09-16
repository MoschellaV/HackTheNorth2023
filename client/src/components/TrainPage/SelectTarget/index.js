import React from "react";
import { Box, Button, Typography, TextField } from "@mui/material";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import Autocomplete from "@mui/material/Autocomplete";

export default function SelectTarget({
    options,
    target,
    setTarget,
    inputValue,
    setInputValue,
    setUserHasSelectedTarget,
}) {
    return (
        <Box sx={{ my: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <AdsClickIcon style={{ fontSize: 50, marginLeft: 10, opacity: 1 }} />
                <Typography variant="h5" component="p" sx={{ maxWidth: 500, ml: 1, fontWeight: 400, fontSize: 22 }}>
                    Select which variable you would like your custom ML model to predict
                </Typography>
            </Box>
            <Box sx={{ my: 3, px: 1 }}>
                <Autocomplete
                    disablePortal
                    options={options}
                    fullWidth
                    renderInput={(params) => <TextField {...params} label="Target options" />}
                    value={target}
                    onChange={(event, newValue) => {
                        setTarget(newValue);
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                />
                <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2, textTransform: "none" }}
                    onClick={() => setUserHasSelectedTarget(true)}
                >
                    Continue
                </Button>
            </Box>
        </Box>
    );
}
