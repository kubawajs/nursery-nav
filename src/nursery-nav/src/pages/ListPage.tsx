import { Grid, CircularProgress } from "@mui/material";
import ListComponent from "../components/ListComponent/ListComponent";
import MapComponent from "../components/MapComponent/MapComponent";
import FiltersBar from "../components/Filters/FiltersBar";
import { Helmet } from "react-helmet-async";
import { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLocations } from "../api/LocationsFetcher";
import { LocationResponse } from "../shared/nursery.interface";
import { getCities, getCitiesResponse } from "../api/CitiesFetcher";

export default function ListPage() {
    const { voivodeship, city } = useParams<{
        voivodeship: string | undefined;
        city: string | undefined;
    }>();

    const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
    const [locations, setLocations] = useState<LocationResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true); // Add loading state
    const [cities, setCities] = useState<getCitiesResponse[]>();

    useLayoutEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 600);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // Set loading state to true before fetching data
            const locations = await getLocations();
            setLocations(locations);
            setIsLoading(false); // Set loading state to false after fetching data
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchCities = async () => {
            const response = await getCities();
            setCities(response);
        };

        fetchCities();
    }, []);

    const title = getTitle(voivodeship, city);
    const description =
        "Znajdź idealny żłobek dla dziecka w najlepszej cenie PLN na miesiąc. Sprawdź dostępność miejsc i dowiedz się, gdzie ich brak. Poznaj nazwy żłobków w okolicy.";
    const image = `${process.env.REACT_APP_API_URL}/images/favicon.ico`;

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
                <FiltersBar defaultVoivodeship={voivodeship} defaultCity={city} citiesResponse={cities} />
            </Grid>
            <Grid item xs={12} md={6}>
                <ListComponent defaultVoivodeship={voivodeship} defaultCity={city} />
            </Grid>
            {!isMobile && (
                <Grid item xs={12} md={6} sx={{ display: { xs: "none", md: "block" } }}>
                    {isLoading ? (
                        <CircularProgress /> // Render loading animation when isLoading is true
                    ) : (
                        <MapComponent locations={locations} />
                    )}
                </Grid>
            )}
        </>
    );
}

function getTitle(voivodeship: string | undefined, city: string | undefined) {
    let title = `Darmowa Wyszukiwarka Żłobków i Klubów Dziecięcych | ${process.env.REACT_APP_NAME}`;
    if (voivodeship && city) {
        title = `Żłobek ${city.toLocaleUpperCase()}, ${voivodeship.toLocaleUpperCase()} - ` + title;
    } else if (voivodeship) {
        title = `Żłobki ${voivodeship.toLocaleUpperCase()} - ` + title;
    }
    return title;
}