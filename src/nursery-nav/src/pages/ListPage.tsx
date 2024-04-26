import { Grid } from "@mui/material";
import ListComponent from "../components/ListComponent/ListComponent";
import MapComponent from "../components/MapComponent/MapComponent";

export default function ListPage() {
    return (
        <>
            <Grid item xs={12} md={6}>
                <ListComponent />
            </Grid>
            <Grid item display={{ xs: "none", md: "block" }} md={6}>
                <MapComponent />
            </Grid>
        </>
    );
}