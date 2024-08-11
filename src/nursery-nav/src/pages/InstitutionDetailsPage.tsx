import { CircularProgress, Grid } from "@mui/material";
import MapComponent from "../components/MapComponent/MapComponent";
import InstitutionDetails from "../components/InstitutionDetails/InstitutionDetails";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getInstitutionDetails } from "../api/InstitutionsFetcher";
import { getLocations } from "../api/LocationsFetcher";
import { Institution, LocationResponse } from "../shared/nursery.interface";

export default function InstitutionDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const [locations, setLocations] = useState<LocationResponse[]>([]);
    const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchInstitution = async () => {
            const institution = await getInstitutionDetails(parseInt(id ?? ""));
            setSelectedInstitution(institution);
        };

        fetchInstitution();
    }, [id]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const locations = await getLocations();
            setLocations(locations);
            setIsLoading(false);
        };

        fetchData();
    }, []);

    const title = `${selectedInstitution?.name} - ${selectedInstitution?.address.city} (${selectedInstitution?.address.voivodeship})`;
    const description = `Informacje o placówce wraz z lokalizacją na mapie - ${selectedInstitution?.name} - ${selectedInstitution?.address.city} (${selectedInstitution?.address.voivodeship})`;
    const image = selectedInstitution?.institutionType === 'NURSERY' ? '/images/nursery-placeholder.jpg' : '/images/child-club-placeholder.jpg';

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
            <Grid item xs={12} md={6}>
                {selectedInstitution && <InstitutionDetails {...selectedInstitution} />}
            </Grid>
            <Grid item display={{ xs: "none", md: "block" }} md={6}>
                {isLoading ? <CircularProgress /> : <MapComponent locations={locations} />}
            </Grid>
        </>
    );
}