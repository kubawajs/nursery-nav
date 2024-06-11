import { Box, Grid, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import Comparison from "../components/Comparison/Comparison";
import { useParams } from "react-router-dom";


export default function ComparisonPage() {
    const title = `Porównanie Żłobków i Klubów Dziecięcych | ${process.env.REACT_APP_NAME}`;
    const description = "Porównaj wybrane żłobki i kluby dziecięce. Sprawdź dostępność miejsc, ceny oraz opinie o placówkach.";
    const image = `${process.env.REACT_APP_API_URL}/images/favicon.ico`;

    const { ids } = useParams<{ ids: string }>();
    const idsArr: string[] = ids ? ids.split(",") : [];
    const institutionIds: number[] = idsArr.map(id => parseInt(id));
    console.log(institutionIds);

    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={image} />
                <meta property="og:url" content={title} />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={image} />
                <meta name="twitter:card" content="summary_large_image" />
            </Helmet>
            <Grid item xs={12}>
                <Box display='flex' justifyContent='center' p={2}>
                    <Typography variant="h1">
                        {institutionIds && institutionIds.length === 0 && <>Brak wybranych placówek do porównania</>}
                        {institutionIds && institutionIds.length > 5 && <>Możesz porównać maksymalnie 5 placówek</>}
                        {institutionIds && institutionIds.length > 0 && institutionIds.length <= 5 && <>Porównanie placówek</>}
                    </Typography>
                </Box>
                {institutionIds && institutionIds.length > 0 && institutionIds.length <= 5 && <Comparison ids={institutionIds} />}
            </Grid>
        </>
    );
}