import { Grid2, } from "@mui/material";

import ListComponent from "../components/ListComponent/ListComponent";
import MapComponent from "../components/MapComponent/MapComponent";
import FiltersBar from "../components/Filters/FiltersBar";

import { getCitiesResponse } from "../api/CitiesFetcher";
import { LocationResponse } from "../shared/nursery.interface";

export default function ListPage({ locations, cities }: { locations: LocationResponse[], cities: getCitiesResponse[] }) {

    return (
        <>
            <Grid2 size={{ xs: 12 }} zIndex={19}>
                <FiltersBar citiesResponse={cities} />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
                <ListComponent />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
                <MapComponent locations={locations} />
            </Grid2>
        </>
    );
}
