import { Box, Paper, Typography, Chip, Button, Stack } from "@mui/material";
import { Institution } from "../../shared/nursery.interface";
import styled from "@emotion/styled";
import { theme } from "../../shared/theme";
import InstitutionDetailsLinks from "./InstitutionDetailsLinks";

const DescriptionBox = styled(Box)(() => ({
    paddingBottom: theme.spacing(2),
}));

const ContactBox = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: theme.spacing(2),
    '& > *': {
        margin: theme.spacing(1),
    },
}));

export default function InstitutionDetailsDescription(institution: Institution) {
    const mainColor = institution.institutionType === 'Żłobek' ? 'primary' : 'secondary';
    const openingHours = institution.openingHours.split(': ')[1] ?? institution.openingHours;
    return (
        <Box p={1}>
            <Paper elevation={2}>
                <DescriptionBox>
                    <Typography variant="subtitle2">Godziny otwarcia</Typography>
                    <Typography variant="body1">{openingHours}</Typography>
                </DescriptionBox>
                <DescriptionBox>
                    <Typography variant="subtitle2">Liczba miejsc</Typography>
                    <Typography variant="body1">{institution.capacity}</Typography>
                </DescriptionBox>
                <DescriptionBox>
                    <Typography variant="subtitle2">Zniżki</Typography>
                    {institution.discounts &&
                        <Stack
                            direction="column"
                            spacing={0.5}
                            alignItems="flex-start"
                        >
                            {institution.discounts.map((discount, index) =>
                                <Chip key={index} label={discount} color={mainColor} />)}
                        </Stack>
                    }
                </DescriptionBox>
                <ContactBox>
                    <Button variant="contained" color="success" href={`mailto:${institution.email}`}>Napisz wiadomość</Button>
                </ContactBox>
                <InstitutionDetailsLinks {...institution} />
            </Paper>
        </Box>
    );
}