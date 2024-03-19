import { PhoneAndroid, Mail, Language } from "@mui/icons-material";
import { Box, Stack, Divider, Typography, Link } from "@mui/material";
import { Institution } from "../../shared/nursery.interface";

export default function InstitutionDetailsLinks(institution: Institution) {
    return (
        <Box>
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="center"
                alignItems="center"
                spacing={{ xs: 1, sm: 2 }}
                divider={<Divider orientation="vertical" flexItem />}
            >
                {institution.phone && <Box>
                    <Typography variant="overline">
                        <Link href={`tel:${institution.phone}`} underline='none' aria-label="Zadzwoń do instytucji">
                            <PhoneAndroid /> {institution.phone}
                        </Link>
                    </Typography>
                </Box>}
                {institution.email && <Box>
                    <Typography variant="overline">
                        <Link href={`mailto:${institution.email}`} underline='none' aria-label="Wyślij wiadomość email">
                            <Mail /> {institution.email}
                        </Link>
                    </Typography>
                </Box>}
                {institution.website && <Box>
                    <Typography variant="overline">
                        <Link href={institution.website} underline='none' aria-label="Odwiedź stronę internetową">
                            <Language /> {institution.website}
                        </Link>
                    </Typography>
                </Box>}
            </Stack>
        </Box>
    );
}