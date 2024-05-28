import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            light: '#e6f3fb',
            main: '#4580c4',
            dark: '#315292',
        },
        secondary: {
            light: '#f7e6f0',
            main: '#c44580',
            dark: '#6f365d',
        },
        success: {
            light: '#d1e9c8',
            main: '#4caf50',
            dark: '#27632a',
        },
        text: {
            primary: '#0d0c1d',
            secondary: '#5e5d70',
        },
    },
    spacing: 8,
    typography: {
        fontFamily: 'Roboto Latin, sans-serif',
        h1: {
            fontSize: '2.5rem'
        },
        h2: {
            fontSize: '2rem'
        },
        h3: {
            fontSize: '1.75rem'
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
        MuiAppBar: {
            styleOverrides: {
                root: {
                    padding: '0',
                }
            }
        },
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
        MuiButton: {
            styleOverrides: {
                contained: {
                    color: '#fff'
                }
            }
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    verticalAlign: 'top',
                }
            }
        },
    }
});