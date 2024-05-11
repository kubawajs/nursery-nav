import { Breadcrumbs, Typography, Button, Box, Stack, Link } from "@mui/material";
import { Institution, InstitutionType } from "../../shared/nursery.interface";
import { generatePath, useNavigate } from "react-router-dom";
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
                    <Link href={generatePath(`${PathConstants.HOME}?voivodeship=${institution.address.voivodeship}`)} color="inherit" variant="overline">{institution.address.voivodeship}</Link>
                    <Typography color="text.light" variant="overline">{institution.address.county}</Typography>
                    <Link href={generatePath(`${PathConstants.HOME}?city=${institution.address.city}`)} variant="overline" underline="none">{institution.address.city}</Link>
                </Breadcrumbs>

                <Button variant="contained" color={mainColor} onClick={handleBackButton}>Powrót</Button>
            </Stack>
        </Box>
    );
}