import { Breadcrumbs, Typography, Button, Box, Toolbar } from "@mui/material";
import { Institution } from "../../shared/nursery.interface";
import { useContext } from "react";
import { InstitutionContext } from "../../App";

export default function InstitutionDetailsTop(institution: Institution) {
    const { setSelectedInstitution } = useContext(InstitutionContext);
    return (
        <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Breadcrumbs aria-label="breadcrumb">
                <Typography color="text.light">{institution.address.voivodeship}</Typography>
                <Typography color="text.light">{institution.address.county}</Typography>
                <Typography color="text.primary">{institution.address.city}</Typography>
            </Breadcrumbs>
            <Button variant="outlined" onClick={() => setSelectedInstitution(null)}>
                Powrót
            </Button>
        </Toolbar>
    );
}