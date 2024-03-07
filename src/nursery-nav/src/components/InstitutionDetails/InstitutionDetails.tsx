import { Box, Chip, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Institution } from "../../shared/nursery.interface";
import { PhoneAndroid, AlternateEmail, Language, Restaurant, FoodBankOutlined, CottageOutlined } from '@mui/icons-material';

export default function InstitutionDetails(institution: Institution) {
    return (
        <Box>
            <Box>
                <Paper elevation={3}>
                    <Chip label={institution.institutionType} />
                    <h1>{institution.name}</h1>
                    <Box>
                        <TableContainer>
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={2}>
                                        <CottageOutlined />
                                    </TableCell>
                                    <TableCell colSpan={2}>
                                        <FoodBankOutlined />
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        {institution.basicPricePerMonth && <>{institution.basicPricePerMonth} PLN / miesiąc</>}
                                    </TableCell>
                                    <TableCell>
                                        {institution.basicPricePerHour && <>{institution.basicPricePerHour} PLN / godzina</>} 
                                    </TableCell>
                                    <TableCell>
                                        {institution.foodPricePerMonth && <>{institution.foodPricePerMonth} PLN miesiąc</>}
                                    </TableCell>
                                    <TableCell>
                                        {institution.foodPricePerDay && <>{institution.foodPricePerDay} PLN / dzień</>}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </TableContainer>
                    </Box>
                </Paper>
            </Box>
            <Box>
                <Paper elevation={1}>
                    <h2>Opis</h2>
                    <Box>
                        <span>
                            {institution.address.fullAddress}
                        </span>
                    </Box>
                    <h3>Godziny otwarcia</h3>
                    <Box>
                        <p>{institution.openingHours}</p>
                    </Box>
                    <h3>Zniżki</h3>
                    {institution.discounts.map((discount, index) => (
                        <Chip key={index} label={discount} />
                    ))}
                </Paper>
            </Box>
            <Box>
                <Paper elevation={3}>
                    <h2>Kontakt</h2>
                    <Box>
                        <PhoneAndroid />
                        <span>
                            {institution.phone}
                        </span>
                    </Box>
                    <Box>
                        <AlternateEmail />
                        <span>
                            {institution.email}
                        </span>
                    </Box>
                    <Box>
                        <Language />
                        <span>
                            {institution.website}
                        </span>
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
}