import { Box, Container, Link, List, ListItem, ListItemText, Paper, Stack, Typography } from "@mui/material";
//import logo from "../public/images/logo.png";

import Metadata from "../components/Metadata/Metadata";

export default function AboutPage() {
    const title = `O aplikacji - ${process.env.NEXT_PUBLIC_NAME}`;
    const description = "Informacje o aplikacji";
    const image = `${process.env.NEXT_PUBLIC_API_URL}/favicon.ico`;

    return (
        <>
            <Metadata title={title} description={description} image={image} url={window.location.href} />
            <Container sx={{ padding: '1rem' }}>
                <Paper elevation={3} sx={{ padding: '1rem' }}>
                    <Stack direction="column" spacing={2}>
                        <Box justifyItems={'center'} textAlign={'center'}>
                            {/* <img src={logo.src} alt={process.env.NEXT_PUBLIC_NAME} width="200px" /> */}
                        </Box>
                        <Typography variant="h1" textAlign={'center'}>O projekcie</Typography>
                        <Typography variant="body1">
                            Celem projektu <Link href="/">{process.env.NEXT_PUBLIC_NAME}</Link> jest ułatwienie rodzicom wyszukiwania pobliskich żłobków i przedszkoli.
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
                                    <ListItemText><strong>Porównanie instytucji:</strong> Porównanie cech wybranych placówek.</ListItemText>
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
                        <Typography variant="h2" typography="h3" textAlign={'center'}>Dane</Typography>
                        <Typography variant="body1">
                            Projekt wykorzystuje dane z serwisu Otwarte Dane.
                        </Typography>
                        <Typography variant="body1">
                            Źródło: <Link href="https://dane.gov.pl/pl/dataset/2106,rejestr-zobkow-lista-instytucji">Rejestr Żłobków - lista instytucji</Link>.
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
