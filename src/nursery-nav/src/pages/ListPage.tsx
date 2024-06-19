import { Grid } from "@mui/material";
import ListComponent from "../components/ListComponent/ListComponent";
import MapComponent from "../components/MapComponent/MapComponent";
import FiltersBar from "../components/Filters/FiltersBar";
import { Helmet } from "react-helmet-async";

export default function ListPage() {
    const title = `Darmowa Wyszukiwarka Żłobków i Klubów Dziecięcych | ${process.env.REACT_APP_NAME}`;
    const description = "Znajdź idealny żłobek dla dziecka w najlepszej cenie PLN na miesiąc. Sprawdź dostępność miejsc i dowiedz się, gdzie ich brak. Poznaj nazwy żłobków w okolicy.";
    const image = `${process.env.REACT_APP_API_URL}/images/favicon.ico`;
    const isMobile = window.innerWidth < 600;

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
            <Grid item xs={12} zIndex={19}>
                <FiltersBar />
            </Grid>
            <Grid item xs={12} md={6}>
                <ListComponent />
            </Grid>
            {!isMobile && <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
                <MapComponent />
            </Grid>}
        </>
    );
}