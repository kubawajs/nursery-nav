import { useSearchParams } from "react-router-dom";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";

import Comparison from "../components/Comparison/Comparison";
import Metadata from "../components/Metadata/Metadata";


export default function ComparisonPage() {
    const title = `Porównanie Żłobków i Klubów Dziecięcych | ${import.meta.env.VITE_APP_NAME}`;
    const description = "Porównaj wybrane żłobki i kluby dziecięce. Sprawdź dostępność miejsc, ceny oraz opinie o placówkach.";
    const image = `${import.meta.env.VITE_APP_API_URL}/images/favicon.ico`;

    const ids = useSearchParams()[0].get("ids");
    const idsArr: string[] = ids ? ids.split(",") : [];
    const institutionIds: number[] = idsArr.map(id => parseInt(id));

    const displayError = !institutionIds || institutionIds.length <= 0 || institutionIds.length > 5;
    const heading = !institutionIds || institutionIds.length <= 0 ? "Brak wybranych placówek do porównania" : institutionIds.length > 5 ? "Możesz porównać maksymalnie 5 placówek" : "";

    return (
        <>
            <Metadata title={title} description={description} image={image} url={title} />
            <Grid item xs={12}>
                {displayError &&
                    <Container fixed>
                        <Stack direction="column" justifyContent="center" alignItems="center" height="80vh">
                            <Typography variant="h1">{heading}</Typography>
                        </Stack>
                    </Container>
                }

                {!displayError &&
                    <>
                        <Box display='flex' justifyContent='center' pt={2}>
                            <Typography variant="h1">Porównanie placówek</Typography>
                        </Box>
                        <Comparison ids={institutionIds} />
                    </>
                }
            </Grid>
        </>
    );
}
