import { Grid2 } from "@mui/material";

import InstitutionDetails from "../components/InstitutionDetails/InstitutionDetails";
import { Institution, LocationResponse } from "../shared/nursery.interface";
import MapComponent from "../components/MapComponent/MapComponent";

export default function InstitutionDetailsPage({ institution, locations }: { institution: Institution, locations: LocationResponse[] }) {
    return (
        <>
            <Grid2 size={{ xs: 12, md: 6 }}>
                {institution && <InstitutionDetails {...institution} />}
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }} display={{ xs: "none", md: "block" }}>
                <MapComponent locations={locations} />
            </Grid2>
        </>
    );
}
