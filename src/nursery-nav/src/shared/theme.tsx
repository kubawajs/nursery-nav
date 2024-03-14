import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            light: '#fbede9',
            main: '#ffbe98',
            dark: '#e97413',
        },
        secondary: {
            light: '#e5f6ff',
            main: '#98d9ff',
            dark: '#5091d7',
        },
        text: {
            primary: '#333',
            secondary: '#666',
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
        h2: {
            fontSize: '2.5rem'
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#ffbe98',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    padding: '1rem',
                }
            }
        },
    }
});