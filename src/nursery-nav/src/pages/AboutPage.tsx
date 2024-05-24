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
            <Container sx={{ padding: '1rem' }}>
                <Paper elevation={3} sx={{ padding: '1rem' }}>
                    <Stack direction="column" spacing={2}>
                        <Box justifyItems={'center'} textAlign={'center'}>
                            <img src="/logo512.png" alt={process.env.REACT_APP_NAME} width="200px" height="200px" />
                        </Box>
                        <Typography variant="h1" textAlign={'center'}>O projekcie</Typography>
                        <Typography variant="body1">
                            Celem projektu <Link href="/">{process.env.REACT_APP_NAME}</Link> jest ułatwienie rodzicom wyszukiwania pobliskich żłobków i przedszkoli.
                            Dzięki intuicyjnemu interfejsowi, użytkownicy mogą szybko znaleźć idealne miejsce dla swojego dziecka, spełniające ich wymagania i oczekiwania.
                        </Typography>
                        <Typography variant="h2" typography="h3" textAlign={'center'}>Funkcje</Typography>
                        <Typography variant="body1">
                            <List>
                                <ListItem>
                                    <ListItemText><strong>Mapa z pinezkami:</strong> Widok mapy pokazujący lokalizacje żłobków i przedszkoli.</ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemText><strong>Szczegóły instytucji:</strong> Informacje o wybranej placówce.</ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemText><strong>Integracja z API:</strong> API z bieżąco aktualizowaną bazą danych</ListItemText>
                                </ListItem>
                            </List>
                        </Typography>
                        <Typography variant="h2" typography="h3" textAlign={'center'}>Technologie</Typography>
                        <Typography variant="body1">
                            Projekt wykorzystuje technologie takie jak React, Typescript, NestJS, oraz biblioteki MUI i React Leaflet.
                            Kod źródłowy aplikacji dostępny jest pod adresem URL: <Link href="https://github.com/kubawajs/nursery-nav">github.com/kubawajs/nursery-nav</Link>.
                        </Typography>
                        <Typography variant="h2" typography="h3" textAlign={'center'}>Autor</Typography>
                        <Box justifyItems={'center'} textAlign={'center'}>
                            <Link href="www.wajs-dev.net"><img src="/author.png" alt="Author's logo" width="150px" height="150px" /></Link>
                        </Box>
                    </Stack>
                </Paper>
            </Container>
        </>
    );
}