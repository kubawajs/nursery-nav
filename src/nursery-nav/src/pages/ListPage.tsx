import { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid2, CircularProgress, Box, debounce } from "@mui/material";

import ListComponent from "../components/ListComponent/ListComponent";
import MapComponent from "../components/MapComponent/MapComponent";
import FiltersBar from "../components/Filters/FiltersBar";
import Metadata from "../components/Metadata/Metadata";

import { getLocations } from "../api/LocationsFetcher";
import { getCities, getCitiesResponse } from "../api/CitiesFetcher";

import { LocationResponse } from "../shared/nursery.interface";

export default function ListPage() {
    const { voivodeship, city } = useParams<{
        voivodeship: string | undefined;
        city: string | undefined;
    }>();

    const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
    const [locations, setLocations] = useState<LocationResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true); // Add loading state
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const [cities, setCities] = useState<getCitiesResponse[]>();

    useLayoutEffect(() => {
        const handleResize = debounce(() => {
            setIsMobile(window.innerWidth < 600);
        }, 150);

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // useEffect(() => {
    //     const fetchLocations = async () => {
    //         const locations = await getLocations();
    //         setLocations(locations);
    //     };

    //     const fetchCities = async () => {
    //         const cities = await getCities();
    //         setCities(cities);
    //     };

    //     Promise.all([fetchLocations(), fetchCities()]).then(() => setIsLoading(false));
    // }, []);

    const title = getTitle(voivodeship, city);
    const description =
        "Znajdź idealny żłobek dla dziecka w najlepszej cenie PLN na miesiąc. Sprawdź dostępność miejsc i dowiedz się, gdzie ich brak. Poznaj nazwy żłobków w okolicy.";
    const image = `${process.env.NEXT_PUBLIC_API_URL}/images/favicon.ico`;

    return (
        <>
            <Metadata title={title} description={description} image={image} url={window.location.href} />
            <Grid2 size={{ xs: 12 }} zIndex={19}>
                <FiltersBar defaultVoivodeship={voivodeship} defaultCity={city} citiesResponse={cities} />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
                <ListComponent defaultVoivodeship={voivodeship} defaultCity={city} />
            </Grid2>
            {!isMobile && (
                <Grid2 size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
                    {(isLoading && !isMapLoaded) ? (
                        <Box alignItems="center" justifyContent={"center"} display="flex" height="100%" width="100%">
                            <CircularProgress />
                        </Box>
                    ) : (
                        <MapComponent locations={locations} setIsMapLoaded={setIsMapLoaded} />
                    )}
                </Grid2>
            )}
        </>
    );
}

function getTitle(voivodeship: string | undefined, city: string | undefined) {
    let title = `Darmowa Wyszukiwarka Żłobków i Klubów Dziecięcych | ${process.env.NEXT_PUBLIC_NAME}`;
    if (voivodeship && city) {
        title = `Żłobek ${city.toLocaleUpperCase()}, ${voivodeship.toLocaleUpperCase()} - ` + title;
    } else if (voivodeship) {
        title = `Żłobki ${voivodeship.toLocaleUpperCase()} - ` + title;
    }
    return title;
}
