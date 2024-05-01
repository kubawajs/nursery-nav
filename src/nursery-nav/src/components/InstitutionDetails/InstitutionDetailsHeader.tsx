import { Box, Chip, Divider, Paper, Stack, Typography } from "@mui/material";
import { Institution, InstitutionType } from "../../shared/nursery.interface";
import { Accessible } from "@mui/icons-material";

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
    const mainColor = institution.institutionType === InstitutionType.NURSERY ? 'primary' : 'secondary';
    const institutionType = institution.institutionType === InstitutionType.NURSERY ? 'ŻŁOBEK' : 'KLUB DZIECIĘCY';

    return (
        <Box p={1}>
            <Paper elevation={2}>
                <Stack direction='row' justifyContent='flex-start' spacing={1}>
                    <Chip label={institutionType} color={mainColor} />
                    {institution.isAdaptedToDisabledChildren && <Chip label={<Accessible fontSize='small' />} color="info" />}
                </Stack>
                <Typography variant="h3">{institution.name}</Typography>
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