import { Breadcrumbs, Typography, Button, Box, Stack } from "@mui/material";
import { Institution, InstitutionType } from "../../shared/nursery.interface";
import { useNavigate } from "react-router-dom";
import PathConstants from "../../shared/pathConstants";

export default function InstitutionDetailsTop(institution: Institution) {
    const mainColor = institution.institutionType === InstitutionType.NURSERY ? 'primary' : 'secondary';
    const navigate = useNavigate();

    const handleBackButton = () => {
        if (window.history?.length && window.history.length > 2) {
            navigate(-1);
        } else {
            navigate(PathConstants.HOME, { replace: true });
        }
    };

    return (
        <Box p={1}>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Breadcrumbs aria-label="breadcrumb">
                    <Typography color="text.light" variant="overline">{institution.address.voivodeship}</Typography>
                    <Typography color="text.light" variant="overline">{institution.address.county}</Typography>
                    <Typography color="text.primary" variant="overline">{institution.address.city}</Typography>
                </Breadcrumbs>
                <Button variant="outlined" color={mainColor} onClick={handleBackButton}>Powrót</Button>
            </Stack>
        </Box>
    );
}