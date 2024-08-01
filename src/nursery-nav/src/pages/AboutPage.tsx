import { Box, Container, Link, List, ListItem, ListItemText, Paper, Stack, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";

export default function AboutPage() {
    const title = `O aplikacji - ${process.env.REACT_APP_NAME}`;
    const description = "Informacje o aplikacji";
    const image = `${process.env.REACT_APP_API_URL}/favicon.ico`;

    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={image} />
                <meta property="og:url" content={window.location.href} />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={image} />
                <meta name="twitter:card" content="summary_large_image" />
            </Helmet>
            <Container sx={{ padding: '2rem' }}>
                <Paper elevation={3} sx={{ padding: '2rem' }}>
                    <Stack direction="column" spacing={2}>
                        <Box textAlign="center">
                            <img src="/images/logo.png" alt={process.env.REACT_APP_NAME} width="200" />
                        </Box>
                        <Typography variant="h1" textAlign="center">O projekcie</Typography>
                        <Typography variant="body1">
                            Celem projektu <Link href="/">{process.env.REACT_APP_NAME}</Link> jest ułatwienie rodzicom wyszukiwania pobliskich żłobków i przedszkoli.
                            Dzięki intuicyjnemu interfejsowi, użytkownicy mogą szybko znaleźć idealne miejsce dla swojego dziecka, spełniające ich wymagania i oczekiwania.
                        </Typography>
                        <Typography variant="h2" textAlign="center">Funkcje</Typography>
                        <List>
                            <ListItem>
                                <ListItemText><strong>Mapa z pinezkami:</strong> Widok mapy pokazujący lokalizacje żłobków i przedszkoli.</ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText><strong>Szczegóły instytucji:</strong> Informacje o wybranej placówce.</ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText><strong>Porównanie instytucji:</strong> Porównanie cech wybranych placówek.</ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText><strong>Integracja z API:</strong> API z bieżąco aktualizowaną bazą danych.</ListItemText>
                            </ListItem>
                        </List>
                        <Typography variant="h2" textAlign="center">Technologie</Typography>
                        <Typography variant="body1">
                            Projekt wykorzystuje technologie takie jak React, TypeScript, NestJS, oraz biblioteki MUI i React Leaflet.
                            Kod źródłowy aplikacji dostępny jest pod adresem: <Link href="https://github.com/kubawajs/nursery-nav">github.com/kubawajs/nursery-nav</Link>.
                        </Typography>
                        <Typography variant="h2" textAlign="center">Dane</Typography>
                        <Typography variant="body1">
                            Projekt wykorzystuje dane z serwisu Otwarte Dane.
                        </Typography>
                        <Typography variant="body1">
                            Źródło: <Link href="https://dane.gov.pl/pl/dataset/2106,rejestr-zobkow-lista-instytucji">Rejestr Żłobków - lista instytucji</Link>.
                        </Typography>
                        <Typography variant="h2" textAlign="center">Autor</Typography>
                        <Box textAlign="center">
                            <Link href="https://www.wajs-dev.net">
                                <img src="/author.png" alt="Author's logo" width="150" height="150" />
                            </Link>
                        </Box>
                    </Stack>
                </Paper>
            </Container>
        </>
    );
}
