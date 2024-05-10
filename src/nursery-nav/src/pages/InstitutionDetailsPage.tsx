import { Grid } from "@mui/material";
import MapComponent from "../components/MapComponent/MapComponent";
import InstitutionDetails from "../components/InstitutionDetails/InstitutionDetails";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { InstitutionContext } from "../components/Layout/Layout";
import { Helmet } from "react-helmet-async";

export default function InstitutionDetailsPage() {
    const { selectedInstitution, setSelectedInstitution } = useContext(InstitutionContext);
    const { id } = useParams<{ id: string }>();
    const title = `${selectedInstitution?.name} - ${process.env.REACT_APP_NAME}`;
    const description = `Informacje o placówce wraz z lokalizacją na mapie - ${selectedInstitution?.name}`;
    const image = selectedInstitution?.institutionType === 'NURSERY' ? '/images/nursery-placeholder.jpg' : '/images/child-club-placeholder.jpg';

    useEffect(() => {
        const fetchInstitution = async () => {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/institutions/details/${id}`);
            const institution = await response.json();
            setSelectedInstitution(institution);
        };
        fetchInstitution();
    }, [id, setSelectedInstitution]);

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
                <MapComponent />
            </Grid>
        </>
    );
}