import React, { useState, useEffect } from "react";
import { Box, Stack, Typography, Grid, CircularProgress } from "@mui/material";
import SchemaIcon from "@mui/icons-material/Schema";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import ModelTrainingIcon from "@mui/icons-material/ModelTraining";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function PredictionStats({ data }) {
    const [formattedData, setFormattedData] = useState([{ index: 0, value: 0 }]);

    const formatData = (arr) => {
        return arr.map((value, index) => ({
            index: index,
            value: value,
        }));
    };

    useEffect(() => {
        setFormattedData(formatData(data.all_accuracy)); // Call setFormattedData inside the useEffect callback
    }, [data.all_accuracy]); // Add data.all_accuracy as a dependency

    return (
        <>
            {formatData ? (
                <Box
                    sx={{
                        boxShadow: "0px 2px 9px rgba(0, 0, 0, 0.25)",
                        borderRadius: 3,
                        width: "100%",
                        // height: 300,
                        my: 2,
                        p: 3,
                    }}
                >
                    <Typography variant="h5" component="p" sx={{ fontWeight: 500 }}>
                        Prediction Statistics
                    </Typography>
                    <Grid container>
                        <Grid item md={2} xs={6}>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: "50%",
                                    border: "10px solid #37DB51",
                                    my: 2,
                                    mx: { xs: 1, md: 3 },
                                    width: { xs: 150, md: 200 },
                                    height: { xs: 150, md: 200 },
                                }}
                            >
                                <Box sx={{ display: "flex", flexDirection: "column", textAlign: "center" }}>
                                    <Typography
                                        variant="h5"
                                        component="p"
                                        sx={{ fontWeight: 600, fontSize: 36, marginLeft: 1 }}
                                    >
                                        {`${(data.val_accuracy * 100).toFixed(0)}%`}
                                    </Typography>
                                    <Typography
                                        variant="p"
                                        component="p"
                                        sx={{ fontWeight: 400, fontSize: 14, opacity: 0.5 }}
                                    >
                                        confidence
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item md={4} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Stack spacing={3} sx={{ width: 250, ml: 15 }}>
                                {/* <Box sx={{ display: "flex", flexDirection: "column", width: 300 }}> */}
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <SchemaIcon style={{ fontSize: 30 }} />
                                    <Typography variant="p" component="p" sx={{ ml: 1, opacity: 0.7, fontSize: 16 }}>
                                        Type: {data.model_type}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <ModelTrainingIcon style={{ fontSize: 30 }} />
                                    <Typography variant="p" component="p" sx={{ ml: 1, opacity: 0.7, fontSize: 16 }}>
                                        Neurons: {data.trainable_params}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <AllInclusiveIcon style={{ fontSize: 30 }} />
                                    <Typography variant="p" component="p" sx={{ ml: 1, opacity: 0.7, fontSize: 16 }}>
                                        Generations: {data.epochs}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <AdsClickIcon style={{ fontSize: 30 }} />
                                    <Typography variant="p" component="p" sx={{ ml: 1, opacity: 0.7, fontSize: 16 }}>
                                        Tar: {data.target}
                                    </Typography>
                                </Box>{" "}
                                {/* </Box> */}
                            </Stack>
                        </Grid>
                        <Grid item md={6}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    width={"100%"}
                                    height={"100%"}
                                    data={formattedData}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="1 1" />

                                    <YAxis
                                        label={{ angle: -90, position: "insideLeft" }}
                                        domain={[formattedData[0].value, "auto"]} // Set the Y-axis domain to start at 0.25
                                    />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#4285F4"
                                        activeDot={{ r: 10 }}
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </Grid>
                    </Grid>
                </Box>
            ) : (
                <CircularProgress />
            )}
        </>
    );
}
