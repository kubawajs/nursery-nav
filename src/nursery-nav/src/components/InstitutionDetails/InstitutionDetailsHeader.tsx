import { Payments, MoreTime, RestaurantMenu } from "@mui/icons-material";
import { Box, Chip, Divider, Paper, Stack, Typography } from "@mui/material";
import { Institution } from "../../shared/nursery.interface";

export default function InstitutionDetailsHeader(institution: Institution) {
    return (
        <Box p={1}>
            <Paper elevation={2}>
                <Chip label={institution.institutionType} />
                <Typography variant="h2">{institution.name}</Typography>
                <Box>
                    <Stack
                        direction="row"
                        spacing={2}
                        divider={<Divider orientation="vertical" flexItem />}
                    >
                        {institution.basicPricePerMonth && (
                            <Typography variant="overline"><Payments />{institution.basicPricePerMonth.toFixed(2)} PLN / miesiąc</Typography>
                        )}
                        {institution.basicPricePerHour && (
                            <Typography variant="overline"><Payments />{institution.basicPricePerHour.toFixed(2)} PLN / godzina</Typography>
                        )}
                        {institution.extendedStayOver10H && (
                            <Typography variant="overline"><MoreTime />{institution.extendedStayOver10H.toFixed(2)} PLN / godzina</Typography>
                        )}
                        {institution.foodPricePerMonth && (
                            <Typography variant="overline"><RestaurantMenu />{institution.foodPricePerMonth.toFixed(2)} PLN miesiąc</Typography>
                        )}
                        {institution.foodPricePerDay && (
                            <Typography variant="overline"><RestaurantMenu />{institution.foodPricePerDay.toFixed(2)} PLN / dzień</Typography>
                        )}
                    </Stack>
                </Box>
            </Paper>
        </Box>
    );
}