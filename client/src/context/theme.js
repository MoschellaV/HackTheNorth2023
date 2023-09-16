import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        primary: {
            main: "#2196f3",
        },
        secondary: {
            main: "#3d5afe",
        },
    },
    typography: {
        fontFamily: "Montserrat, Arial, sans-serif",
        fontSize: 14,
        h1: {
            fontSize: 50,
            fontWeight: 800,
        },
    },
});

export default theme;
