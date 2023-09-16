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
        h2: {
            fontSize: 40,
            fontWeight: 600,
        },
        h3: {
            fontWeight: 600,
            fontSize: 55,
        },

        h5: {
            fontSize: 20,
            fontWeight: 600,
        },
        subtitle1: {
            fontSize: 14,
            opacity: 0.7,
            fontWeight: 600,
        },
    },
});

export default theme;
