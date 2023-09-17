import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import moment from "moment";
import BarChartGraph from "./BarChartGraph";
import { Divider, Grid } from "@mui/material";
import RadarChartGraph from "./RadarChartGraph";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    borderRadius: 4,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};

export default function EntryModal({ encoding, open, setOpen, prediction }) {
    const [isHovered, setIsHovered] = React.useState(false);
    const handleClose = () => setOpen(false);
    const [averages, setAverages] = React.useState([]);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    function formatUnixToDateTime(unixTimestamp) {
        const date = new Date(unixTimestamp);
        const formattedDate = moment(date).format("YYYY-MM-DD");
        return formattedDate;
    }

    return (
        <div>
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <Typography variant="h5" component="h2" sx={{ fontSize: 26 }}>
                        {prediction.data.name}
                    </Typography>
                    <Typography
                        variant="p"
                        component="p"
                        sx={{
                            fontSize: 12,
                            fontWeight: 500,
                            opacity: 0.5,
                            mb: 1,
                        }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        {!isHovered
                            ? `predicted, ${moment(prediction.data.time).fromNow()}`
                            : `predicted,  ${formatUnixToDateTime(prediction.data.time)}`}
                    </Typography>
                    <Divider />

                    <Grid container sx={{ my: 2 }}>
                        <Grid item xs={6} md={4} sx={{ minHeight: 250 }}>
                            {/* mapping likelihood */}
                            <Typography
                                variant="p"
                                component="p"
                                sx={{ fontSize: 16, fontWeight: 600, opacity: 0.5, mb: 1 }}
                            >
                                Event Likelihood
                            </Typography>
                            <Box sx={{ my: 0.5 }}>
                                {Object.keys(prediction.data.likelihood).map((key) => {
                                    const value = prediction.data.likelihood[key];
                                    const roundedValue = parseFloat(value).toFixed(2) * 100;

                                    return (
                                        <Typography variant="p" component="p" sx={{ fontSize: 18 }} key={key}>
                                            <span>
                                                {key}: <span style={{ fontWeight: 600 }}>{`${roundedValue}%`}</span>
                                            </span>
                                        </Typography>
                                    );
                                })}
                            </Box>
                            {/* mapping avgs */}
                            <Typography
                                variant="p"
                                component="p"
                                sx={{ fontSize: 16, fontWeight: 600, opacity: 0.5, mt: 2, mb: 1 }}
                            >
                                Average ML Confidence
                            </Typography>
                            {Object.keys(prediction.data.averages).map((key) => {
                                const value = prediction.data.averages[key];
                                const roundedValue = parseFloat(value).toFixed(2);

                                return (
                                    <Typography variant="p" component="p" sx={{ fontSize: 18 }} key={key}>
                                        <span>
                                            {key}: <span style={{ fontWeight: 600 }}>{roundedValue}</span>
                                        </span>
                                    </Typography>
                                );
                            })}
                        </Grid>

                        <Grid item xs={6} md={8} sx={{ minHeight: 250 }}>
                            {Object.keys(prediction.data.freq).length <= 2 ? (
                                <BarChartGraph frequencies={prediction.data.freq} />
                            ) : (
                                <RadarChartGraph frequencies={prediction.data.freq} />
                            )}
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
}
