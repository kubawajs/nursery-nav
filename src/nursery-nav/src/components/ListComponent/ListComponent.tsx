import { Box, Button, Card, CardActions, CardContent, List, ListItem, Typography } from "@mui/material";
import { Institution } from "../../shared/nursery.interface";

export interface ListComponentProps {
    institutions: Institution[];
}

export default function ListComponent(props: ListComponentProps) {
    return (
        <Box component="section">
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Znaleziono {props.institutions.length} instytucji
            </Typography>
            <List>
                {props.institutions.map((institution, index) => (
                    <ListItem key={index} sx={{ display: 'block' }}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography sx={{ fontSize: 11 }} color="text.secondary" gutterBottom>
                                    {institution.institutionType}
                                </Typography>
                                <Typography sx={{ mb: 1.0 }} color="text.secondary" gutterBottom>
                                    {institution.address.city}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.primary">
                                    {institution.name}
                                </Typography>
                                <Typography sx={{ mb: 1.2 }} color="text.secondary">
                                    {institution.basicPricePerMonth} zł
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button href={institution.website} target="_blank" rel="noreferrer">
                                    Strona www
                                </Button>
                            </CardActions>
                        </Card>
                    </ListItem>
                ))};
            </List>
        </Box>
    );
}