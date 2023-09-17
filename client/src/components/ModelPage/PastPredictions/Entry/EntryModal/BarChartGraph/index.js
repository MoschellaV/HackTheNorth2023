import React, { useEffect, useState } from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function BarChartGraph({ frequencies }) {
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
            <BarChart width={150} height={40} data={data}>
                <XAxis dataKey="prediction" />
                <Tooltip />
                <Bar dataKey="freq" fill="#4285F4" />
            </BarChart>
        </ResponsiveContainer>
    );
}
