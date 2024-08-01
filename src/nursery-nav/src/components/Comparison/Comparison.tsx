import { Box, Button, Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Institution, InstitutionType } from "../../shared/nursery.interface";
import { useEffect, useState, useMemo, useCallback } from "react";
import { generatePath } from "react-router-dom";
import PathConstants from "../../shared/pathConstants";
import { getInstitutionsDetails } from "../../api/InstitutionsFetcher";

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
            const institutionsDto = await getInstitutionsDetails(ids);
            const institutionsToCompare: InstitutionToCompare[] = institutionsDto.map((institution: Institution) => ({
                id: institution.id,
                name: institution.name,
                address: `${institution.address.city}, ${institution.address.voivodeship}`,
                institutionType: institution.institutionType === InstitutionType.NURSERY ? 'ŻŁOBEK' : 'KLUB DZIECIĘCY',
                price: institution.basicPricePerMonth
                    ? `${institution.basicPricePerMonth} PLN/miesiąc`
                    : institution.basicPricePerHour
                        ? `${institution.basicPricePerHour} PLN/godzina`
                        : "Brak informacji",
                food: institution.foodPricePerMonth
                    ? `${institution.foodPricePerMonth} PLN/miesiąc`
                    : institution.foodPricePerDay
                        ? `${institution.foodPricePerDay} PLN/dzień`
                        : "Brak informacji",
                extendedStay: institution.extendedStayOver10H ? `${institution.extendedStayOver10H} PLN` : "Brak informacji",
                availability: institution.capacity > institution.kidsEnrolled ? "Tak" : "Nie",
                openingHours: institution.openingHours.split(': ')[1] ?? institution.openingHours,
                discounts: institution.discounts ?? [],
                isAdapted: institution.isAdaptedToDisabledChildren ? "Tak" : "Nie",
            }));
            setInstitutions(institutionsToCompare);
        };
        fetchInstitution();
    }, [ids]);

    const renderChip = useCallback((label: string, color: "primary" | "secondary" | "default" | "success" | "error" | "info" | "warning") => (
        <Chip label={label} color={color} />
    ), []);

    const renderDiscounts = useCallback((discounts: string[]) => (
        discounts.length === 0
            ? "Brak zniżek"
            : discounts.map((discount: string, index: number) => (
                <Box key={index} p={0.25}>
                    <Chip label={discount} color="primary" />
                </Box>
            ))
    ), []);

    const renderRows = useMemo(() => {
        const rows = [
            { label: "Typ", render: (institution: InstitutionToCompare) => renderChip(institution.institutionType, institution.institutionType === "ŻŁOBEK" ? 'primary' : 'secondary') },
            { label: "Cena", render: (institution: InstitutionToCompare) => <strong>{institution.price}</strong> },
            { label: "Wyżywienie", render: (institution: InstitutionToCompare) => institution.food },
            { label: "Pobyt powyżej 10h", render: (institution: InstitutionToCompare) => institution.extendedStay },
            { label: "Dostępność miejsc", render: (institution: InstitutionToCompare) => institution.availability },
            { label: "Godziny otwarcia", render: (institution: InstitutionToCompare) => institution.openingHours },
            { label: "Zniżki", render: (institution: InstitutionToCompare) => renderDiscounts(institution.discounts) },
            { label: "Przystosowany do osób z niepełnosprawnościami", render: (institution: InstitutionToCompare) => institution.isAdapted }
        ];

        return rows.map(row => (
            <TableRow key={row.label}>
                <TableCell>
                    <Typography variant="h6">{row.label}</Typography>
                </TableCell>
                {institutions.map((institution, index) => (
                    <TableCell key={index} align="center">
                        {row.render(institution)}
                    </TableCell>
                ))}
            </TableRow>
        ));
    }, [institutions, renderChip, renderDiscounts]);

    return (
        <Box p={2} display='flex'>
            <TableContainer component={Paper}>
                <Table sx={{ tableLayout: { xs: 'auto', md: 'fixed' } }}>
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            {institutions.map((institution, index) => (
                                <TableCell key={index} align="center">
                                    <Typography variant="h5">{institution.name}</Typography>
                                    <Typography variant="body1">{institution.address}</Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renderRows}
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
}
