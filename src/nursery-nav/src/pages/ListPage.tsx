import { Grid } from "@mui/material";
import ListComponent from "../components/ListComponent/ListComponent";
import MapComponent from "../components/MapComponent/MapComponent";

export default function ListPage() {
    return (
        <Grid container>
            <Grid item xs={12} sm={6}>
                <ListComponent />
            </Grid>
            <Grid item xs={12} sm={6}>
                <MapComponent />
            </Grid>
        </Grid>
    );
}