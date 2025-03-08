'use client'

import { useSearchParams } from 'next/navigation'
import { Grid2, } from "@mui/material";

import ListComponent from "../components/ListComponent/ListComponent";
import MapComponent from "../components/MapComponent/MapComponent";
import FiltersBar from "../components/Filters/FiltersBar";

import { getCitiesResponse } from "../api/CitiesFetcher";
import { LocationResponse } from "../shared/nursery.interface";

export default function ListPage({ locations, cities }: { locations: LocationResponse[], cities: getCitiesResponse[] }) {
    const searchParams = useSearchParams();
    const voivodeship = searchParams ? searchParams.get('voivodeship') || undefined : undefined;
    const city = searchParams ? searchParams.get('city') || undefined : undefined;

    return (
        <>
            <Grid2 size={{ xs: 12 }} zIndex={19}>
                <FiltersBar defaultVoivodeship={voivodeship} defaultCity={city} citiesResponse={cities} />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
                <ListComponent defaultVoivodeship={voivodeship} defaultCity={city} />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
                <MapComponent locations={locations} />
            </Grid2>
        </>
    );
}
