import { Box, Button, Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Institution, InstitutionType } from "../../shared/nursery.interface";
import { useEffect, useState } from "react";
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

export default function Comparison({ ids }: ComparisonProps) {
    const [institutions, setInstitutions] = useState<InstitutionToCompare[]>([]);

    useEffect(() => {
        const fetchInstitution = async () => {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/institutions/details?id=${ids.join('&id=')}`);
            const institutionsDto = await response.json() as Institution[];
            console.log(institutionsDto);
            const institutionsToCompare: InstitutionToCompare[] = institutionsDto.map((institution: Institution) => {
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
            console.log(institutionsToCompare);
            setInstitutions(institutionsToCompare);
        };
        fetchInstitution();
    }, [ids]);

    return (
        <Box p={2} display='flex'>
            <TableContainer component={Paper}>
                <Table style={{ tableLayout: 'fixed' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            {institutions.map((institution, index) => (
                                <TableCell key={index} align="center">
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
                            {institutions.map((institution, index) => (
                                <TableCell key={index} align="center">
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
                            {institutions.map((institution, index) => (
                                <TableCell key={index} align="center">
                                    {institution.price}
                                </TableCell>
                            ))}
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography variant="h2" typography="h6">Wyżywienie</Typography>
                            </TableCell>
                            {institutions.map((institution, index) => (
                                <TableCell key={index} align="center">
                                    {institution.food}
                                </TableCell>
                            ))}
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography variant="h2" typography="h6">Pobyt powyżej 10h</Typography>
                            </TableCell>
                            {institutions.map((institution, index) => (
                                <TableCell key={index} align="center">
                                    {institution.extendedStay}
                                </TableCell>
                            ))}
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography variant="h2" typography="h6">Dostępność miejsc</Typography>
                            </TableCell>
                            {institutions.map((institution, index) => (
                                <TableCell key={index} align="center">
                                    {institution.availability}
                                </TableCell>
                            ))}
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography variant="h2" typography="h6">Godziny otwarcia</Typography>
                            </TableCell>
                            {institutions.map((institution, index) => (
                                <TableCell key={index} align="center">
                                    {institution.openingHours}
                                </TableCell>
                            ))}
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography variant="h2" typography="h6">Zniżki</Typography>
                            </TableCell>
                            {institutions.map((institution, index) => (
                                <TableCell key={index} align="center">
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
                            {institutions.map((institution, index) => (
                                <TableCell key={index} align="center">
                                    {institution.isAdapted}
                                </TableCell>
                            ))}
                        </TableRow>
                        <TableRow>
                            <TableCell />
                            {institutions.map((institution, index) => (
                                <TableCell key={index} align="center">
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