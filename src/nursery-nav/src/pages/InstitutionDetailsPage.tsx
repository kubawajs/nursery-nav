import { Grid } from "@mui/material";
import MapComponent from "../components/MapComponent/MapComponent";

export default function InstitutionDetailsPage() {
    return (
        <Grid container>
            <Grid item xs={12} sm={6}>
                <InstitutionDetailsPage />
            </Grid><Grid item xs={12} sm={6}>
                <MapComponent />
            </Grid>
        </Grid>
    );
}