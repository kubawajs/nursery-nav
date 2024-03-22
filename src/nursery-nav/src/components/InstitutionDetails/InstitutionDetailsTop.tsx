import { Breadcrumbs, Typography, Button, Box, Stack } from "@mui/material";
import { Institution } from "../../shared/nursery.interface";
import { useContext } from "react";
import { InstitutionContext } from "../../App";

export default function InstitutionDetailsTop(institution: Institution) {
    const { setSelectedInstitution } = useContext(InstitutionContext);
    const mainColor = institution.institutionType === 'Żłobek' ? 'primary' : 'secondary';
    return (
        <Box p={1}>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Breadcrumbs aria-label="breadcrumb">
                    <Typography color="text.light" variant="overline">{institution.address.voivodeship}</Typography>
                    <Typography color="text.light" variant="overline">{institution.address.county}</Typography>
                    <Typography color="text.primary" variant="overline">{institution.address.city}</Typography>
                </Breadcrumbs>
                <Button color={mainColor} onClick={() => setSelectedInstitution(null)}>
                    Powrót
                </Button>
            </Stack>
        </Box>
    );
}