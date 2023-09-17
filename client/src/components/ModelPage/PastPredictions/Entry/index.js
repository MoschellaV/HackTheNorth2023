import { Box, Divider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import moment from "moment";

export default function Entry({ prediction, mostRecentPrediction }) {
    function formatDateFromUnix(unixTimestamp) {
        const dateMoment = moment.unix(unixTimestamp / 1000);
        const formattedDate = dateMoment.format("MMM Do, YYYY");
        return formattedDate;
    }

    return (
        <Box>
            <Box sx={{ my: 0.5 }} className={mostRecentPrediction === prediction.data.time && "backgroundAnimated"}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="p" component="p" sx={{ fontWeight: 500 }}>
                        {prediction.data.name}
                    </Typography>
                    <Box
                        sx={{
                            borderRadius: "50%",
                            backgroundColor: "#00CC00",
                            width: 7,
                            height: 7,
                            mx: 0.5,
                            ml: 1,
                        }}
                    />
                    <Typography variant="p" component="p" sx={{ fontWeight: 600, opacity: 0.5, fontSize: 14 }}>
                        {mostRecentPrediction === prediction.data.time && "Recent"}
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="p" component="p" sx={{ fontSize: 14, opacity: 0.4, fontWeight: 500 }}>
                        {formatDateFromUnix(prediction.data.time)}
                    </Typography>
                    <a href="/">
                        <Typography
                            variant="p"
                            component="p"
                            sx={{ fontSize: 14, color: "#0F8CFF", textDecoration: "underline" }}
                        >
                            View Details
                        </Typography>
                    </a>
                </Box>
            </Box>
            <Divider />
        </Box>
    );
}
