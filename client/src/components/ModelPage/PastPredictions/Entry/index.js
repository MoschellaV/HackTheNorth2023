import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import moment from "moment";

export default function Entry({ prediction }) {
    function formatDateFromUnix(unixTimestamp) {
        const dateMoment = moment.unix(unixTimestamp / 1000);
        const formattedDate = dateMoment.format("MMM Do, YYYY");
        return formattedDate;
    }

    return (
        <Box>
            <Box sx={{ my: 0.5 }}>
                <Typography variant="p" component="p" sx={{ fontWeight: 500 }}>
                    {prediction.data.name}
                </Typography>
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
