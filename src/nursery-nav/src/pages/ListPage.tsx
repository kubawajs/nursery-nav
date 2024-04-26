import { Grid } from "@mui/material";
import ListComponent from "../components/ListComponent/ListComponent";
import MapComponent from "../components/MapComponent/MapComponent";
import FiltersBar from "../components/Filters/FiltersBar";

export default function ListPage() {
    return (
        <>
            <Grid container>
                <Grid item xs={12} zIndex={19}>
                    <FiltersBar />
                </Grid>
                <Grid item xs={12} md={6}>
                    <ListComponent />
                </Grid>
                <Grid item display={{ xs: "none", md: "block" }} md={6}>
                    <MapComponent />
                </Grid>
            </Grid>
        </>
    );
}