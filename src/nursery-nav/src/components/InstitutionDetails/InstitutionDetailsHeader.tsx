import { Box, Chip, Divider, Paper, Stack, Typography } from "@mui/material";
import { Institution } from "../../shared/nursery.interface";

function PriceWithLabel(label: string, price?: number) {
    return (price && price > 0 && (
        <Stack direction='column'>
            <Typography variant="subtitle1">
                {price.toFixed(2)} PLN
            </Typography>
            <Typography variant="caption">
                {label}
            </Typography>
        </Stack>
    ));
}

export default function InstitutionDetailsHeader(institution: Institution) {
    const mainColor = institution.institutionType === 'Żłobek' ? 'primary' : 'secondary';
    return (
        <Box p={1}>
            <Paper elevation={2}>
                <Chip label={institution.institutionType} color={mainColor} />
                <Typography variant="h2">{institution.name}</Typography>
                <Divider />
                <Box paddingTop={2} display='flex' justifyContent='space-between'>
                    <Stack
                        direction="row"
                        gap={3}
                    >
                        {PriceWithLabel('miesiąc', institution.basicPricePerMonth)}
                        {PriceWithLabel('godzina', institution.basicPricePerHour)}
                        {PriceWithLabel('pobyt powyżej 10h', institution.extendedStayOver10H)}
                        {PriceWithLabel('wyżywienie / miesiąc', institution.foodPricePerMonth)}
                        {PriceWithLabel('wyżywienie / dzień', institution.foodPricePerDay)}
                    </Stack>
                </Box>
            </Paper>
        </Box>
    );
}