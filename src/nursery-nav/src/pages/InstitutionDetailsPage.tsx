import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress, Grid2 } from "@mui/material";

import MapComponent from "../components/MapComponent/MapComponent";
import Metadata from "../components/Metadata/Metadata";
import InstitutionDetails from "../components/InstitutionDetails/InstitutionDetails";

import { getInstitutionDetails } from "../api/InstitutionsFetcher";
import { getLocations } from "../api/LocationsFetcher";

import { Institution, LocationResponse } from "../shared/nursery.interface";

export default function InstitutionDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const [locations, setLocations] = useState<LocationResponse[]>([]);
    const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isMapLoaded, setIsMapLoaded] = useState(false);

    useEffect(() => {
        const fetchInstitution = async () => {
            const institution = await getInstitutionDetails(parseInt(id ?? ""));
            if (!institution || Object.keys(institution).length === 0) {
                // Redirect to home page if institution is empty or an empty object
                window.location.href = '/';
                return;
            }
            setSelectedInstitution(institution);
        };

        fetchInstitution();
    }, [id]);

    useEffect(() => {
        const fetchData = async () => {
            const locations = await getLocations();
            setLocations(locations);
        };

        fetchData().then(() => setIsLoading(false));
    }, []);

    const title = `${selectedInstitution?.name} - ${selectedInstitution?.address.city} (${selectedInstitution?.address.voivodeship})`;
    const description = `Informacje o placówce wraz z lokalizacją na mapie - ${selectedInstitution?.name} - ${selectedInstitution?.address.city} (${selectedInstitution?.address.voivodeship})`;
    const image = selectedInstitution?.institutionType === 'NURSERY' ? '/images/nursery-placeholder.jpg' : '/images/child-club-placeholder.jpg';

    return (
        <>
            <Metadata title={title} description={description} image={image} url={title} />
            <Grid2 size={{ xs: 12, md: 6 }}>
                {selectedInstitution && <InstitutionDetails {...selectedInstitution} />}
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }} display={{ xs: "none", md: "block" }}>
                {(isLoading && !isMapLoaded) ? <CircularProgress /> : <MapComponent locations={locations} setIsMapLoaded={setIsMapLoaded} />}
            </Grid2>
        </>
    );
}
