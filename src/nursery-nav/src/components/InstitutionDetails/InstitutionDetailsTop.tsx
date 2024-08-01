import { Breadcrumbs, Typography, Button, Box, Stack, Link } from "@mui/material";
import { Institution, InstitutionType } from "../../shared/nursery.interface";
import { generatePath, useNavigate } from "react-router-dom";
import { useCallback, useMemo } from "react";
import PathConstants from "../../shared/pathConstants";

export default function InstitutionDetailsTop({ institution }: { institution: Institution }) {
    const mainColor = useMemo(() => institution.institutionType === InstitutionType.NURSERY ? 'primary' : 'secondary', [institution.institutionType]);
    const navigate = useNavigate();

    const handleBackButton = useCallback(() => {
        if (window.history.length > 2) {
            navigate(-1);
        } else {
            navigate(PathConstants.HOME, { replace: true });
        }
    }, [navigate]);

    const voivodeshipPath = useMemo(() => generatePath(`${PathConstants.HOME}/institutions/${institution.address.voivodeship}`), [institution.address.voivodeship]);
    const cityPath = useMemo(() => generatePath(`${PathConstants.HOME}?city=${institution.address.city}`), [institution.address.city]);

    return (
        <Box p={1}>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link href={voivodeshipPath} color="inherit" variant="overline">{institution.address.voivodeship}</Link>
                    <Typography color="text.light" variant="overline">{institution.address.county}</Typography>
                    <Link href={cityPath} variant="overline" underline="none">{institution.address.city}</Link>
                </Breadcrumbs>

                <Button variant="contained" color={mainColor} onClick={handleBackButton}>Powrót</Button>
            </Stack>
        </Box>
    );
}
