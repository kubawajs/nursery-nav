import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            light: '#e5f6ff',
            main: '#98d9ff',
            dark: '#57a5ec',
        },
        secondary: {
            light: '#fbede9',
            main: '#ffbe98',
            dark: '#f77c18',
        },
        text: {
            primary: '#333',
            secondary: '#666',
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