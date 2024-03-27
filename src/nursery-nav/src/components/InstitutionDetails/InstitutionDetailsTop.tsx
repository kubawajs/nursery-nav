import { Breadcrumbs, Typography, Button, Box, Stack } from "@mui/material";
import { Institution } from "../../shared/nursery.interface";
import { useContext } from "react";
import { InstitutionContext } from "../../App";
import { useSearchParams } from "react-router-dom";

export default function InstitutionDetailsTop(institution: Institution) {
    const { setSelectedInstitution } = useContext(InstitutionContext);
    const [queryParam, setQueryParam] = useSearchParams();
    const mainColor = institution.institutionType === 'Żłobek' ? 'primary' : 'secondary';

    function handleBackButton() {
        return () => {
            setSelectedInstitution(null);
            queryParam.delete('regNo');
            setQueryParam(queryParam);
        };
    }

    return (
        <Box p={1}>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Breadcrumbs aria-label="breadcrumb">
                    <Typography color="text.light" variant="overline">{institution.address.voivodeship}</Typography>
                    <Typography color="text.light" variant="overline">{institution.address.county}</Typography>
                    <Typography color="text.primary" variant="overline">{institution.address.city}</Typography>
                </Breadcrumbs>
                <Button color={mainColor} onClick={handleBackButton()}>
                    Powrót
                </Button>
            </Stack>
        </Box>
    );
}