// src/theme/theme.js
import {
    createTheme
} from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#1565c0",
        },
        secondary: {
            main: "#f50057",
        },
    },
    shape: {
        borderRadius: 12,
    },
    typography: {
        fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    },
});

export default theme;