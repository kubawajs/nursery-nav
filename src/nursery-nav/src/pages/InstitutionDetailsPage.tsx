import { Grid } from "@mui/material";
import MapComponent from "../components/MapComponent/MapComponent";
import InstitutionDetails from "../components/InstitutionDetails/InstitutionDetails";

export default function InstitutionDetailsPage() {
    return (
        <>
            <Grid item xs={12} md={6}>
                <InstitutionDetails />
            </Grid>
            <Grid item display={{ xs: "none", md: "block" }} md={6}>
                <MapComponent />
            </Grid>
        </>
    );
}