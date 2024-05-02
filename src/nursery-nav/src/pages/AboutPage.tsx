import { Container, Link, Stack, Typography } from "@mui/material";

export default function AboutPage() {
    return (
        <Container sx={{ padding: '1rem' }}>
            <Stack direction="column" spacing={2}>
                <Typography variant="h1">O projekcie</Typography>
                <Typography variant="body1">
                    Aplikacja {process.env.REACT_APP_NAME} to projekt stworzony w oparciu o dane udostępnione na stronie Otwarte Dane - <Link href="https://dane.gov.pl/pl/dataset/2106,rejestr-zobkow-lista-instytucji/resource/56670/table">Rejestr Żłobków - lista instytucji</Link>.
                </Typography>
                <Typography variant="body1">
                    Celem aplikacji jest umożliwienie użytkownikom przeglądanie i wyszukiwanie żłobków oraz klubów dziecięcych w Polsce.
                </Typography>
                <Typography variant="body1">
                    Kod źródłowy aplikacji dostępny jest pod adresem URL: <Link href="https://github.com/kubawajs/nursery-nav">github.com/kubawajs/nursery-nav</Link>.
                </Typography>
            </Stack>
        </Container>
    );
}