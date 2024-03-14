import { Box, Paper, Typography, Chip } from "@mui/material";
import { Institution } from "../../shared/nursery.interface";

export default function InstitutionDetailsDescription(institution: Institution) {
    return <Box p={1}>
        <Paper elevation={2}>
            <Typography variant="subtitle1">Opis</Typography>
            <Box>
                <Typography variant="body1">{institution.address.fullAddress}</Typography>
            </Box>
            <Typography variant="subtitle2">Godziny otwarcia</Typography>
            <Box>
                <Typography variant="body1">{institution.openingHours}</Typography>
            </Box>
            <Typography variant="subtitle2">Zniżki</Typography>
            {institution.discounts &&
                institution.discounts.map((discount, index) => <Chip key={index} label={discount} />)}
        </Paper>
    </Box>;
}