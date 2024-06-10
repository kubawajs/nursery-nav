import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Institution } from "../../shared/nursery.interface";

export default function Comparison(institutions: Institution[]) {
    const properties = [
        "Typ",
        "Cena",
        "Wyżywienie",
        "Pobyt powyżej 10h",
        "Dostępność miejsc",
        "Godziny otwarcia",
        "Zniżki",
        "Przystosowany do osób z niepełnosprawnościami"
    ];

    return (
        <Box p={2}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>
                                <Typography variant="h2" typography="h6">Żłobek 1</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="h2" typography="h6">Żłobek 1</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="h2" typography="h6">Żłobek 1</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {properties.map((property) => (
                            <TableRow key={property}>
                                <TableCell>
                                    <Typography variant="h2" typography="h6">{property}</Typography>
                                </TableCell>
                                {institutions && institutions.map((institution) => (
                                    <TableCell key={institution.id}>
                                        {String(institution[property as keyof Institution])}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}