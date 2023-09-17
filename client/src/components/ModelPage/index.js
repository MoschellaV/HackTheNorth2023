import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDocument } from "../../utils/FetchDoc";
import { Box, Divider, Typography, CircularProgress } from "@mui/material";
import CenterWrapperWide from "../CenterWrapperWide";
import PredictionStats from "./PredictionStats";

export default function ModelPage() {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);

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
            <CenterWrapperWide>
                <Box sx={{ my: 5 }}>
                    <Typography component="p" variant="body1" sx={{ fontSize: 16 }}>
                        Model
                    </Typography>
                    <Typography component="h2" variant="h2">
                        {data.name}
                    </Typography>
                    <PredictionStats data={data} />
                </Box>
            </CenterWrapperWide>
        </>
    ) : (
        <CircularProgress />
    );
}
