import { Grid } from "@mui/material";
import ListComponent from "../components/ListComponent/ListComponent";
import MapComponent from "../components/MapComponent/MapComponent";
import FiltersBar from "../components/Filters/FiltersBar";
import { Helmet } from "react-helmet-async";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";

export default function ListPage() {
    const { voivodeship, city } = useParams<{ voivodeship: string | undefined, city: string | undefined }>();

    const title = useMemo(() => {
        let baseTitle = `Darmowa Wyszukiwarka Żłobków i Klubów Dziecięcych | ${process.env.REACT_APP_NAME}`;
        if (voivodeship && city) {
            return `Żłobek ${city.toLocaleUpperCase()}, ${voivodeship.toLocaleUpperCase()} - ` + baseTitle;
        }
        if (voivodeship) {
            return `Żłobki ${voivodeship.toLocaleUpperCase()} - ` + baseTitle;
        }
        return baseTitle;
    }, [voivodeship, city]);

    const description = "Znajdź idealny żłobek dla dziecka w najlepszej cenie PLN na miesiąc. Sprawdź dostępność miejsc i dowiedz się, gdzie ich brak. Poznaj nazwy żłobków w okolicy.";
    const image = `${process.env.REACT_APP_API_URL}/images/favicon.ico`;

    const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

    const handleResize = useCallback(() => {
        setIsMobile(window.innerWidth < 600);
    }, []);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [handleResize]);

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
            <Grid container spacing={2}>
                <Grid item xs={12} zIndex={19}>
                    <FiltersBar defaultVoivodeship={voivodeship} defaultCity={city} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <ListComponent defaultVoivodeship={voivodeship} defaultCity={city} />
                </Grid>
                {!isMobile && (
                    <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
                        <MapComponent />
                    </Grid>
                )}
            </Grid>
        </>
    );
}
