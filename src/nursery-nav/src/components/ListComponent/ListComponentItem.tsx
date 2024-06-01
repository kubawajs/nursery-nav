import {
    Box, Button, ButtonGroup, Card,
    CardContent,
    Chip,
    Link,
    ListItem,
    Stack,
    Typography
} from '@mui/material';
import { Accessible, FmdGood, Language, Mail, Phone } from '@mui/icons-material';
import { InstitutionType } from '../../shared/nursery.interface';
import PathConstants from '../../shared/pathConstants';
import {
    Link as RouterLink,
    generatePath,
} from 'react-router-dom';

interface ListComponentItemProps {
    name: string;
    id: number;
    institutionType: string;
    city: string;
    basicPricePerHour: number;
    basicPricePerMonth: number;
    website: string;
    phone: string;
    email: string;
    isAdaptedToDisabledChildren: boolean;
    isAvailable: boolean;
}

export function ListComponentItem(props: ListComponentItemProps) {
    const mainColor = props.institutionType === InstitutionType.NURSERY ? "primary" : "secondary";

    return (
        <Link component={RouterLink} to={generatePath(PathConstants.INSTITUTION_DETAILS, { id: props.id })} underline='none'>
            <ListItem sx={{ display: 'block' }}>
                <Card sx={{ display: 'flex', padding: 0, paddingRight: 2, paddingLeft: 2 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                        <CardContent sx={{ flex: '1 0 auto', paddingRight: '0' }}>
                            <Box>
                                <Box display='flex' marginBottom={1} sx={{ justifyContent: 'space-between' }}>
                                    <Stack direction='row' spacing={1}>
                                        <Chip label={props.institutionType === InstitutionType.NURSERY ? 'ŻŁOBEK' : 'KLUB DZIECIĘCY'} color={mainColor} />
                                        {props.isAdaptedToDisabledChildren && <Chip label={<Accessible fontSize='small' />} color="info" sx={{ display: { xs: 'none', lg: 'flex' } }} />}
                                    </Stack>
                                    <Typography
                                        component="span"
                                        variant="subtitle1"
                                        padding={0.25}
                                        fontWeight={700}
                                    >
                                        {props.basicPricePerHour > 0 && <>{props.basicPricePerHour.toFixed(2)} PLN / godzina</>}
                                        {props.basicPricePerMonth > 0 && <>{props.basicPricePerMonth.toFixed(2)} PLN / miesiąc</>}
                                        {!props.basicPricePerMonth && !props.basicPricePerHour && <Typography variant='overline'>Brak danych</Typography>}
                                    </Typography>
                                </Box>
                                <Typography variant="h2" typography="h4" paddingBottom={2}>
                                    {props.name}
                                </Typography>
                                <Box display='flex' justifyContent='space-between'>
                                    <Typography variant="h4" typography="body1" color="text.secondary">
                                        <FmdGood />{props.city}
                                    </Typography>
                                    <ButtonGroup variant="text" aria-label="basic outlined button group" color={mainColor}>
                                        {props.phone && <Button aria-label='Zadzwoń do placówki'>
                                            <Phone sx={{ fontSize: '1.25rem' }} />
                                        </Button>}
                                        {props.email && <Button aria-label='Napisz wiadomość email'>
                                            <Mail sx={{ fontSize: '1.25rem' }} />
                                        </Button>}
                                        {props.website && <Button aria-label='Odwiedź stronę internetową'>
                                            <Language sx={{ fontSize: '1.25rem' }} />
                                        </Button>}
                                    </ButtonGroup>
                                </Box>
                            </Box>
                        </CardContent>
                    </Box>
                </Card>
            </ListItem >
        </Link>
    );
}
