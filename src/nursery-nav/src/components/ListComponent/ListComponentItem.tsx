import {
    Badge,
    Box, Button, ButtonGroup, Card,
    CardContent,
    CardMedia,
    Chip,
    ListItem,
    Typography
} from '@mui/material';
import { Accessible, FmdGood, Language, Mail, Phone } from '@mui/icons-material';

interface ListComponentItemProps {
    name: string;
    institutionType: string;
    city: string;
    basicPricePerMonth: number;
    website: string;
    phone: string;
    email: string;
    isAdaptedToDisabledChildren: boolean;
}

export function ListComponentItem(props: ListComponentItemProps) {
    const mainColor = props.institutionType === 'Żłobek' ? "primary" : "secondary";
    const imagePath = props.institutionType === 'Żłobek' ? '/images/nursery-placeholder.jpg' : '/images/child-club-placeholder.jpg';
    const imageAlt = props.institutionType === 'Żłobek'
        ? 'Photo by <a href="https://unsplash.com/@charlesdeluvio?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">charlesdeluvio</a> on < a href = "https://unsplash.com/photos/white-sheep-baby-mobile-2vfwTakDTIo?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"> Unsplash</a >'
        : 'Photo by <a href="https://unsplash.com/@babynatur?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Baby Natur</a> on <a href="https://unsplash.com/photos/five-assorted-color-racing-car-toys-Hld-gd-WN7k?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>';

    return (
        <ListItem sx={{ display: 'block' }}>
            <Card sx={{ display: 'flex', padding: 0, paddingRight: 2 }}>
                <Box>
                    <CardMedia
                        component="img"
                        sx={{ display: { xs: 'none', sm: 'block' }, width: 160, height: '100%', objectFit: 'cover' }}
                        image={imagePath}
                        alt={imageAlt}
                    />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <CardContent sx={{ flex: '1 0 auto', paddingRight: '0' }}>
                        <Box>
                            <Box display='flex' marginBottom={1} sx={{ justifyContent: 'space-between' }}>
                                <Box>
                                    <Chip label={props.institutionType} color={mainColor} />
                                </Box>
                                <Typography
                                    component="span"
                                    variant="subtitle1"
                                    padding={0.25}
                                    fontWeight={700}
                                >
                                    {props.basicPricePerMonth > 0 && <>{props.basicPricePerMonth.toFixed(2)} PLN / miesiąc</>}
                                    {!props.basicPricePerMonth && <Typography variant='overline'>Brak danych</Typography>}
                                </Typography>
                            </Box>
                            <Typography variant="h5" paddingBottom={2}>
                                {props.name} {props.isAdaptedToDisabledChildren && <Accessible />}
                            </Typography>
                            <Box display='flex' justifyContent='space-between'>
                                <Typography variant="subtitle2" color="text.secondary">
                                    <FmdGood />{props.city}
                                </Typography>
                                <ButtonGroup variant="text" aria-label="basic outlined button group" color={mainColor}>
                                    <Button href={`tel:${props.phone}`} aria-label='Zadzwoń do instytucji'>
                                        <Phone sx={{ fontSize: '1.25rem' }} />
                                    </Button>
                                    <Button href={`mailto:${props.email}`} aria-label='Napisz wiadomość email'>
                                        <Mail sx={{ fontSize: '1.25rem' }} />
                                    </Button>
                                    <Button href={props.website} aria-label='Odwiedź stronę internetową'>
                                        <Language sx={{ fontSize: '1.25rem' }} />
                                    </Button>
                                </ButtonGroup>
                            </Box>
                        </Box>
                    </CardContent>
                </Box>
            </Card>
        </ListItem >
    );
}
