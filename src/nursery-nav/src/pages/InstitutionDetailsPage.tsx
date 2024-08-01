import { Grid } from "@mui/material";
import MapComponent from "../components/MapComponent/MapComponent";
import InstitutionDetails from "../components/InstitutionDetails/InstitutionDetails";
import { useContext, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { InstitutionContext } from "../components/Layout/Layout";
import { Helmet } from "react-helmet-async";
import { getInstitutionDetails } from "../api/InstitutionsFetcher";

export default function InstitutionDetailsPage() {
    const { selectedInstitution, setSelectedInstitution } = useContext(InstitutionContext);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchInstitution = async () => {
            if (id) {
                const institution = await getInstitutionDetails(parseInt(id));
                setSelectedInstitution(institution);
            }
        };
        fetchInstitution();
    }, [id, setSelectedInstitution]);

    const title = useMemo(() =>
        selectedInstitution
            ? `${selectedInstitution.name} - ${selectedInstitution.address.city} (${selectedInstitution.address.voivodeship})`
            : 'Detaliczne informacje o placówce',
        [selectedInstitution]
    );

    const description = useMemo(() =>
        selectedInstitution
            ? `Informacje o placówce wraz z lokalizacją na mapie - ${selectedInstitution.name} - ${selectedInstitution.address.city} (${selectedInstitution.address.voivodeship})`
            : 'Szczegóły dotyczące placówki',
        [selectedInstitution]
    );

    const image = useMemo(() =>
        selectedInstitution?.institutionType === 'NURSERY'
            ? '/images/nursery-placeholder.jpg'
            : '/images/child-club-placeholder.jpg',
        [selectedInstitution]
    );

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
                <Grid item xs={12} md={6}>
                    {selectedInstitution && <InstitutionDetails {...selectedInstitution} />}
                </Grid>
                <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
                    <MapComponent />
                </Grid>
            </Grid>
        </>
    );
}
