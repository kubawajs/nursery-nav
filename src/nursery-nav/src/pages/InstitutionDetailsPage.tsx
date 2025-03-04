'use client'

import { CircularProgress, Grid2 } from "@mui/material";

import InstitutionDetails from "../components/InstitutionDetails/InstitutionDetails";
import { Institution, LocationResponse } from "../shared/nursery.interface";
import { useState, useEffect } from "react";
import { getLocations } from "../api/LocationsFetcher";
import MapComponent from "../components/MapComponent/MapComponent";


export default function InstitutionDetailsPage({ institution }: { institution: Institution }) {
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
            <Grid2 size={{ xs: 12, md: 6 }}>
                {institution && <InstitutionDetails {...institution} />}
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }} display={{ xs: "none", md: "block" }}>
                {(isLoading && !isMapLoaded) ? <CircularProgress /> : <MapComponent locations={locations} setIsMapLoaded={setIsMapLoaded} />}
            </Grid2>
        </>
    );
}
