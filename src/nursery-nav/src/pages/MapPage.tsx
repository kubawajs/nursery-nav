import { Grid2 } from "@mui/material";
import FiltersBar from "../components/Filters/FiltersBar";
import MapComponent from "../components/MapComponent/MapComponent";
import ListComponent from "../components/ListComponent/ListComponent";

import { LocationResponse } from "../shared/nursery.interface";



export default function MapPage(locations: { locations: LocationResponse[], institutionIds: number[] }) {

    return (
        <>
            <Grid2 size={{ xs: 12 }} zIndex={19}>
                <FiltersBar />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}>
                <ListComponent />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
                <MapComponent locations={locations.locations} institutionIds={locations.institutionIds} />
            </Grid2>
        </>
    );
}
