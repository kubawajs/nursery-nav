import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import Comparison from "../components/Comparison/Comparison";
import { useSearchParams } from "react-router-dom";

export default function ComparisonPage() {
    const title = `Porównanie Żłobków i Klubów Dziecięcych | ${process.env.REACT_APP_NAME}`;
    const description = "Porównaj wybrane żłobki i kluby dziecięce. Sprawdź dostępność miejsc, ceny oraz opinie o placówkach.";
    const image = `${process.env.REACT_APP_API_URL}/images/favicon.ico`;

    const [searchParams] = useSearchParams();
    const ids = searchParams.get("ids");
    const idsArr: string[] = ids ? ids.split(",") : [];
    const institutionIds: number[] = idsArr.map(id => parseInt(id, 10));

    const displayError = !institutionIds.length || institutionIds.length > 5;
    const heading = !institutionIds.length
        ? "Brak wybranych placówek do porównania"
        : institutionIds.length > 5
            ? "Możesz porównać maksymalnie 5 placówek"
            : "";

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
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                    {displayError ? (
                        <Container fixed>
                            <Stack
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                                height="80vh"
                            >
                                <Typography variant="h1">{heading}</Typography>
                            </Stack>
                        </Container>
                    ) : (
                        <>
                            <Box display="flex" justifyContent="center" pt={2}>
                                <Typography variant="h1">Porównanie placówek</Typography>
                            </Box>
                            <Comparison ids={institutionIds} />
                        </>
                    )}
                </Grid>
            </Grid>
        </>
    );
}
