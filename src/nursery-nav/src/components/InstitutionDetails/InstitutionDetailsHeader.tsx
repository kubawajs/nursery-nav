import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import { Institution, InstitutionType } from "../../shared/nursery.interface";
import { Accessible, CurrencyExchange, DinnerDining, FmdGood, MoreTime, Payments } from "@mui/icons-material";
import PropTypes from "prop-types";
import { useMemo } from "react";

const PriceWithLabel = ({ label, icon: Icon, color, price }: { label: string, icon: React.ElementType, color: string, price?: number }) => {
    const iconColor = color + '.dark';
    return price && price > 0 ? (
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
    ) : null;
};

PriceWithLabel.propTypes = {
    label: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
    color: PropTypes.string.isRequired,
    price: PropTypes.number,
};

export default function InstitutionDetailsHeader({ institution }: { institution: Institution }) {
    const mainColor = useMemo(() => institution.institutionType === InstitutionType.NURSERY ? 'primary' : 'secondary', [institution.institutionType]);
    const institutionType = useMemo(() => institution.institutionType === InstitutionType.NURSERY ? 'ŻŁOBEK' : 'KLUB DZIECIĘCY', [institution.institutionType]);
    const backgroundColor = useMemo(() => mainColor + '.light', [mainColor]);

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
                        <PriceWithLabel label="miesiąc" icon={Payments} color={mainColor} price={institution.basicPricePerMonth} />
                        <PriceWithLabel label="godzina" icon={CurrencyExchange} color={mainColor} price={institution.basicPricePerHour ?? 0} />
                        <PriceWithLabel label="pobyt powyżej 10h" icon={MoreTime} color={mainColor} price={institution.extendedStayOver10H} />
                        <PriceWithLabel label="wyżywienie / miesiąc" icon={DinnerDining} color={mainColor} price={institution.foodPricePerMonth} />
                        <PriceWithLabel label="wyżywienie / dzień" icon={DinnerDining} color={mainColor} price={institution.foodPricePerDay} />
                    </Stack>
                </Box>
            </Paper>
        </Box>
    );
}
