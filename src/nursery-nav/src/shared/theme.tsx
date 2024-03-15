import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        mode: 'light',
        secondary: {
            light: '#fbede9',
            main: '#ffbe98',
            dark: '#e97413',
        },
        primary: {
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
        h1: {
            fontSize: '3rem'
        },
        h2: {
            fontSize: '2.5rem'
        },
        h3: {
            fontSize: '2rem'
        },
        h4: {
            fontSize: '1.5rem'
        },
        h5: {
            fontSize: '1.25rem'
        },
        h6: {
            fontSize: '1rem'
        },
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    padding: '1rem',
                }
            }
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    color: '#fff',
                }
            }
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    verticalAlign: 'sub',
                }
            }
        },
    }
});