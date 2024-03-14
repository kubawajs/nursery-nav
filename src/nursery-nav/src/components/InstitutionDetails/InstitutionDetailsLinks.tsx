import { PhoneAndroid, Mail, Language } from "@mui/icons-material";
import { Box, Paper, Stack, Divider, Typography, Link } from "@mui/material";
import { Institution } from "../../shared/nursery.interface";

export default function InstitutionDetailsLinks(institution: Institution) {
    return (
        <Box p={1}>
            <Paper elevation={2}>
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    justifyContent="center"
                    alignItems="center"
                    spacing={{ xs: 1, sm: 2 }}
                    divider={<Divider orientation="vertical" flexItem />}
                >
                    <Box>
                        <Typography variant="overline">
                            <Link href={`tel:${institution.phone}`} underline='none'>
                                <PhoneAndroid /> {institution.phone}
                            </Link>
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="overline">
                            <Link href={`mailto:${institution.email}`} underline='none'>
                                <Mail /> {institution.email}
                            </Link>
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="overline">
                            <Link href={institution.website} underline='none'>
                                <Language /> {institution.website}
                            </Link>
                        </Typography>
                    </Box>
                </Stack>
            </Paper>
        </Box>
    );
}