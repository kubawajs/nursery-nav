import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress, Grid2 } from "@mui/material";

import FiltersBar from "../components/Filters/FiltersBar";
import MapComponent from "../components/MapComponent/MapComponent";
import ListComponent from "../components/ListComponent/ListComponent";
import Metadata from "../components/Metadata/Metadata";

import { getLocations } from "../api/LocationsFetcher";

import { LocationResponse } from "../shared/nursery.interface";

export default function MapPage() {
    const { voivodeship, city } = useParams<{ voivodeship: string | undefined, city: string | undefined }>();
    let title = `Wyszukiwarka Żłobków i Klubów Dziecięcych - widok mapy | ${import.meta.env.VITE_APP_NAME}`;
    if (voivodeship && city) {
        title = `Żłobek ${city.toLocaleUpperCase()}, ${voivodeship.toLocaleUpperCase()} - ` + title;
    }
    else if (voivodeship) {
        title = `Żłobki ${voivodeship.toLocaleUpperCase()} - ` + title;
    }

    const description = "Znajdź idealny żłobek dla dziecka w najlepszej cenie PLN na miesiąc. Sprawdź dostępność miejsc i dowiedz się, gdzie ich brak. Poznaj nazwy żłobków w okolicy.";
    const image = `${import.meta.env.VITE_APP_API_URL}/images/favicon.ico`;

    const [locations, setLocations] = useState<LocationResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isMapLoaded, setIsMapLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const locations = await getLocations();
            setLocations(locations);
        };

        fetchData().then(() => setIsLoading(false));
    }, []);

    return (
        <>
            <Metadata title={title} description={description} image={image} url={window.location.href} />
            <Grid2 size={{ xs: 12 }} zIndex={19}>
                <FiltersBar defaultVoivodeship={voivodeship} defaultCity={city} />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}>
                <ListComponent defaultVoivodeship={voivodeship} defaultCity={city} />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
                {(isLoading && !isMapLoaded) ?
                    <CircularProgress />
                    :
                    <MapComponent locations={locations} setIsMapLoaded={setIsMapLoaded} />
                }
            </Grid2>
        </>
    );
}
