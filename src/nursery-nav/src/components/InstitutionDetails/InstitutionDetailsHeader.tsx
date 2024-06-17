import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import { Institution, InstitutionType } from "../../shared/nursery.interface";
import { Accessible, CurrencyExchange, DinnerDining, FmdGood, MoreTime, Payments } from "@mui/icons-material";
import PropTypes from "prop-types";

function PriceWithLabel(label: string, icon: PropTypes.ReactComponentLike, color: string, price?: number) {
    const Icon = icon;
    const iconColor = color + '.dark';
    return (price && price > 0 && (
        <Paper elevation={0}>
            <Stack direction='column' justifyContent='center' alignItems='center'>
                <Icon fontSize='large' sx={{ color: iconColor }} />
                <Typography variant="subtitle1">
                    {price.toFixed(2)} PLN
                </Typography>
                <Typography variant="caption">
                    {label}
                </Typography>
            </Stack>
        </Paper>
    )) || null;
}

export default function InstitutionDetailsHeader(institution: Institution) {
    const mainColor = institution.institutionType === InstitutionType.NURSERY ? 'primary' : 'secondary';
    const institutionType = institution.institutionType === InstitutionType.NURSERY ? 'ŻŁOBEK' : 'KLUB DZIECIĘCY';
    const backgroundColor = mainColor + '.light';

    return (
        <Box p={2}>
            <Paper elevation={2} sx={{ padding: 0 }}>
                <Box>
                    <Paper elevation={0} sx={{ backgroundColor: backgroundColor }}>
                        <Stack direction='row' justifyContent='flex-start' spacing={1} pt={2}>
                            <Chip label={institutionType} color={mainColor} />
                            {institution.isAdaptedToDisabledChildren && <Chip label={<Accessible fontSize='small' />} color="info" />}
                        </Stack>
                        <Box pt={2}>
                            <Typography variant="h1" typography="h3">{institution.name}</Typography>
                        </Box>
                        <Box pt={1}>
                            <Typography variant="subtitle1" color="text.secondary">
                                <FmdGood />{institution.address.city}
                            </Typography>
                        </Box>
                    </Paper>
                </Box>
                <Box pt={2}>
                    <Stack
                        direction="row"
                        justifyContent='center'
                        alignItems='center'
                        textAlign='center'
                        gap={{ xs: 1, sm: 2, md: 3 }}
                    >
                        {PriceWithLabel('miesiąc', Payments, mainColor, institution.basicPricePerMonth)}
                        {PriceWithLabel('godzina', CurrencyExchange, mainColor, institution.basicPricePerHour)}
                        {PriceWithLabel('pobyt powyżej 10h', MoreTime, mainColor, institution.extendedStayOver10H)}
                        {PriceWithLabel('wyżywienie / miesiąc', DinnerDining, mainColor, institution.foodPricePerMonth)}
                        {PriceWithLabel('wyżywienie / dzień', DinnerDining, mainColor, institution.foodPricePerDay)}
                    </Stack>
                </Box>
            </Paper>
        </Box >
    );
}