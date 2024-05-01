import { Breadcrumbs, Typography, Button, Box, Stack } from "@mui/material";
import { Institution, InstitutionType } from "../../shared/nursery.interface";
import { Link } from "react-router-dom";
import PathConstants from "../../shared/pathConstants";

export default function InstitutionDetailsTop(institution: Institution) {
    const mainColor = institution.institutionType === InstitutionType.NURSERY ? 'primary' : 'secondary';

    return (
        <Box p={1}>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Breadcrumbs aria-label="breadcrumb">
                    <Typography color="text.light" variant="overline">{institution.address.voivodeship}</Typography>
                    <Typography color="text.light" variant="overline">{institution.address.county}</Typography>
                    <Typography color="text.primary" variant="overline">{institution.address.city}</Typography>
                </Breadcrumbs>
                <Link to={PathConstants.HOME}>
                    <Button variant="outlined" color={mainColor}>Powrót</Button>
                </Link>
            </Stack>
        </Box>
    );
}