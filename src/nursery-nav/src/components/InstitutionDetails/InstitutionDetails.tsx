import { Box, Chip, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Institution } from "../../shared/nursery.interface";
import { PhoneAndroid, AlternateEmail, Language, Restaurant, FoodBankOutlined, CottageOutlined } from '@mui/icons-material';

export default function InstitutionDetails(props: Institution) {
    return (
        <Box>
            <Box>
                <Paper elevation={3}>
                    <Chip label={props.institutionType} />
                    <h1>{props.name}</h1>
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
                                        {props.basicPricePerMonth && <>{props.basicPricePerMonth} PLN / miesiąc</>}
                                    </TableCell>
                                    <TableCell>
                                        {props.basicPricePerHour && <>{props.basicPricePerHour} PLN / godzina</>} 
                                    </TableCell>
                                    <TableCell>
                                        {props.foodPricePerMonth && <>{props.foodPricePerMonth} PLN miesiąc</>}
                                    </TableCell>
                                    <TableCell>
                                        {props.foodPricePerDay && <>{props.foodPricePerDay} PLN / dzień</>}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </TableContainer>
                    </Box>
                </Paper>
            </Box>
            <Box>
                <Paper elevation={0}>
                    <h2>Opis</h2>
                    <Box>
                        <span>
                            {props.address.fullAddress}
                        </span>
                    </Box>
                    <h3>Godziny otwarcia</h3>
                    <Box>
                        <p>{props.openingHours}</p>
                    </Box>
                    <h3>Zniżki</h3>
                    {props.discounts.map((discount, index) => (
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
                            {props.phone}
                        </span>
                    </Box>
                    <Box>
                        <AlternateEmail />
                        <span>
                            {props.email}
                        </span>
                    </Box>
                    <Box>
                        <Language />
                        <span>
                            {props.website}
                        </span>
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
}