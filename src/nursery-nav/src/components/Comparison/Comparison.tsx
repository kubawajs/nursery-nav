import { Box, Button, Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Institution, InstitutionType } from "../../shared/nursery.interface";
import { generatePath } from "react-router-dom";
import PathConstants from "../../shared/pathConstants";

export interface InstitutionToCompare {
    id: number;
    name: string;
    address: string;
    institutionType: string;
    price: string;
    food: string;
    extendedStay: string;
    availability: string;
    openingHours: string;
    discounts: string[];
    isAdapted: string;
}

export interface ComparisonProps {
    ids: number[];
}

export default function Comparison({ institutions }: { institutions: Institution[] }) {
    const institutionsToCompare: InstitutionToCompare[] = institutions.map((institution: Institution) => {
        const institutionToCompare: InstitutionToCompare = {
            id: institution.id,
            name: institution.name,
            address: `${institution.address.city}, ${institution.address.voivodeship}`,
            institutionType: institution.institutionType === InstitutionType.NURSERY ? 'ŻŁOBEK' : 'KLUB DZIECIĘCY',
            price: institution.basicPricePerMonth ? `${institution.basicPricePerMonth} PLN/miesiąc` : institution.basicPricePerHour ? `${institution.basicPricePerHour} PLN/godzina` : "Brak informacji",
            food: institution.foodPricePerMonth ? `${institution.foodPricePerMonth} PLN/miesiąc` : institution.foodPricePerDay ? `${institution.foodPricePerDay} PLN/dzień` : "Brak informacji",
            extendedStay: institution.extendedStayOver10H ? `${institution.extendedStayOver10H} PLN` : "Brak informacji",
            availability: institution.capacity > institution.kidsEnrolled ? "Tak" : "Nie",
            openingHours: institution.openingHours.split(': ')[1] ?? institution.openingHours,
            discounts: institution.discounts ? institution.discounts : [],
            isAdapted: institution.isAdaptedToDisabledChildren ? "Tak" : "Nie",
        };
        return institutionToCompare;
    });

    return (
        <Box p={2} display='flex'>
            <TableContainer component={Paper}>
                <Table sx={{ tableLayout: { xs: 'auto', md: 'fixed' } }}>
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            {institutionsToCompare.map((institution) => (
                                <TableCell key={institution.id} align="center">
                                    <Typography variant="h2" typography="h5">{institution.name}</Typography>
                                    <Typography variant="h3" typography="body1">{institution.address}</Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <Typography variant="h2" typography="h6">Typ</Typography>
                            </TableCell>
                            {institutionsToCompare.map((institution) => (
                                <TableCell key={institution.id} align="center">
                                    <Chip label={institution.institutionType}
                                        color={institution.institutionType === "ŻŁOBEK" ? 'primary' : 'secondary'}
                                    />
                                </TableCell>
                            ))}
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography variant="h2" typography="h6">Cena</Typography>
                            </TableCell>
                            {institutionsToCompare.map((institution) => (
                                <TableCell key={institution.id} align="center">
                                    <Typography variant="h2" typography="h6">
                                        <strong>{institution.price}</strong>
                                    </Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography variant="h2" typography="h6">Wyżywienie</Typography>
                            </TableCell>
                            {institutionsToCompare.map((institution) => (
                                <TableCell key={institution.id} align="center">
                                    {institution.food}
                                </TableCell>
                            ))}
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography variant="h2" typography="h6">Pobyt powyżej 10h</Typography>
                            </TableCell>
                            {institutionsToCompare.map((institution) => (
                                <TableCell key={institution.id} align="center">
                                    {institution.extendedStay}
                                </TableCell>
                            ))}
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography variant="h2" typography="h6">Dostępność miejsc</Typography>
                            </TableCell>
                            {institutionsToCompare.map((institution) => (
                                <TableCell key={institution.id} align="center">
                                    {institution.availability}
                                </TableCell>
                            ))}
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography variant="h2" typography="h6">Godziny otwarcia</Typography>
                            </TableCell>
                            {institutionsToCompare.map((institution) => (
                                <TableCell key={institution.id} align="center">
                                    {institution.openingHours}
                                </TableCell>
                            ))}
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography variant="h2" typography="h6">Zniżki</Typography>
                            </TableCell>
                            {institutionsToCompare.map((institution) => (
                                <TableCell key={institution.id} align="center">
                                    {institution.discounts.map((discount, index) => (
                                        <Box p={0.25}>
                                            <Chip key={index} label={discount} color="primary" />
                                            <br />
                                        </Box>
                                    ))}
                                    {institution.discounts.length === 0 && "Brak zniżek"}
                                </TableCell>
                            ))}
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography variant="h2" typography="h6">Przystosowany do osób z niepełnosprawnościami</Typography>
                            </TableCell>
                            {institutionsToCompare.map((institution) => (
                                <TableCell key={institution.id} align="center">
                                    {institution.isAdapted}
                                </TableCell>
                            ))}
                        </TableRow>
                        <TableRow>
                            <TableCell />
                            {institutionsToCompare.map((institution) => (
                                <TableCell key={institution.id} align="center">
                                    <Button variant="contained" color="success" href={generatePath(PathConstants.INSTITUTION_DETAILS, { id: institution.id })}>Zobacz więcej</Button>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};