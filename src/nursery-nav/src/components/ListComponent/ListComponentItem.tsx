import {
    Box, Button, ButtonGroup, Card,
    CardContent,
    CardMedia,
    Chip,
    ListItem,
    Typography
} from '@mui/material';
import { FmdGood, Language, Mail, Phone } from '@mui/icons-material';

interface ListComponentItemProps {
    name: string;
    institutionType: string;
    city: string;
    basicPricePerMonth: number;
    website: string;
    phone: string;
    email: string;
}
export function ListComponentItem(props: ListComponentItemProps) {
    const mainColor = props.institutionType === 'Żłobek' ? "primary" : "secondary";
    return (
        <ListItem sx={{ display: 'block' }}>
            <Card sx={{ display: 'flex', padding: 0, paddingRight: 2 }}>
                <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image="https://source.unsplash.com/random"
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <CardContent sx={{ flex: '1 0 auto', paddingRight: '0' }}>
                        <Box>
                            <Box display='flex' marginBottom={1} sx={{ justifyContent: 'space-between' }}>
                                <Chip label={props.institutionType} color={mainColor} />
                                <Typography
                                    component="span"
                                    variant="subtitle1"
                                    padding={0.25}
                                    fontWeight={700}
                                >
                                    {props.basicPricePerMonth && <>{props.basicPricePerMonth.toFixed(2)} PLN / miesiąc</>}
                                </Typography>
                            </Box>
                            <Typography variant="h5" paddingBottom={2}>
                                {props.name}
                            </Typography>
                            <Box display='flex' justifyContent='space-between'>
                                <Typography variant="subtitle2" color="text.secondary">
                                    <FmdGood />{props.city}
                                </Typography>
                                <ButtonGroup variant="text" aria-label="basic outlined button group" color={mainColor}>
                                    <Button href={`tel:${props.phone}`}><Phone sx={{ fontSize: '1.25rem' }} /></Button>
                                    <Button href={`mailto:${props.email}`}><Mail sx={{ fontSize: '1.25rem' }} /></Button>
                                    <Button href={props.website}><Language sx={{ fontSize: '1.25rem' }} /></Button>
                                </ButtonGroup>
                            </Box>
                        </Box>
                    </CardContent>
                </Box>
            </Card>
        </ListItem >
    );
}
