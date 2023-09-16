import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

export default function FilePreview({ file }) {
    const [tableData, setTableData] = useState([]);
    const [tableHeaders, setTableHeaders] = useState([]);

    useEffect(() => {
        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const content = e.target.result;
                const rows = content.split("\n").map((row) => row.split(","));
                setTableHeaders(rows[0]);
                setTableData(rows.slice(1, 5)); // Get the first 4 rows as data
            };

            reader.readAsText(file);
        }
    }, [file]);

    return (
        <div>
            {tableHeaders.length > 0 && (
                <div>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: "#f2f2f2" }}>
                                    {tableHeaders.map((header, index) => (
                                        <TableCell key={index}>{header}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tableData.map((row, rowIndex) => (
                                    <TableRow key={rowIndex}>
                                        {row.map((cell, cellIndex) => (
                                            <TableCell key={cellIndex}>{cell}</TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )}
        </div>
    );
}
