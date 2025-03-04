import { Grid2, Container, Stack, Typography, Box } from "@mui/material";
import Comparison from "../../../components/Comparison/Comparison";
import { getInstitutionsDetails } from "../../../api/InstitutionsFetcher";

export const metadata = {
    title: `Porównanie Żłobków i Klubów Dziecięcych | ${process.env.NEXT_PUBLIC_NAME}`,
    description: `Porównanie Żłobków i Klubów Dziecięcych | ${process.env.NEXT_PUBLIC_NAME}`,
    image: `${process.env.NEXT_PUBLIC_API_URL}/images/favicon.ico`
}

export default async function Page({ searchParams }: { searchParams: Promise<{ ids: string }> }) {
    const ids = (await searchParams).ids.split(',').map((id: string) => parseInt(id));
    const displayError = !ids || ids.length <= 0 || ids.length > 5;
    const heading = !ids || ids.length <= 0 ? "Brak wybranych placówek do porównania" : ids.length > 5 ? "Możesz porównać maksymalnie 5 placówek" : "";

    const institutions = await getInstitutionsDetails(ids);

    return (
        <>
            <Grid2 size={{ xs: 12 }}>
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
                        <Comparison institutions={institutions} />
                    </>
                }
            </Grid2>
        </>
    );
}