import { Breadcrumbs, Typography, Button, Box, Stack, Link } from "@mui/material";
import { Institution, InstitutionType } from "../../shared/nursery.interface";
import PathConstants from "../../shared/pathConstants";
import { useRouter } from "next/navigation";

export default function InstitutionDetailsTop(institution: Institution) {
    const router = useRouter();
    const mainColor = institution.institutionType === InstitutionType.NURSERY ? 'primary' : 'secondary';

    return (
        <Box p={1}>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link href={`${PathConstants.HOME}institutions/${institution.address.voivodeship}`} color="inherit" variant="overline">{institution.address.voivodeship}</Link>
                    <Typography color="text.light" variant="overline">{institution.address.county}</Typography>
                    <Link href={`${PathConstants.HOME}?city=${institution.address.city}`} variant="overline" underline="none">{institution.address.city}</Link>
                </Breadcrumbs>

                <Button onClick={() => router.back()} variant="contained" color={mainColor}>Powrót</Button>
            </Stack>
        </Box>
    );
}