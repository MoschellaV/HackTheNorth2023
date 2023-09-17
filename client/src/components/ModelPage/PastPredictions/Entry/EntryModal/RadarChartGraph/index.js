import React, { useEffect, useState } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";

export default function RadarChartGraph({ frequencies }) {
    const [data, setData] = useState();

    useEffect(() => {
        function createDataArray(frequencies) {
            const data = [];

            for (const pred in frequencies) {
                if (frequencies.hasOwnProperty(pred)) {
                    data.push({
                        prediction: pred,
                        freq: frequencies[pred],
                    });
                }
            }
            return data;
        }
        setData(createDataArray(frequencies));
        console.log(createDataArray(frequencies));
    }, []);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="prediction" />
                <PolarRadiusAxis />
                <Radar name="Frequency" dataKey="freq" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Tooltip />
            </RadarChart>
        </ResponsiveContainer>
    );
}
