import {
    Box, Button, ButtonGroup, Card,
    CardContent,
    CardMedia,
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
    basicPricePerMonth: number;
    website: string;
    phone: string;
    email: string;
    isAdaptedToDisabledChildren: boolean;
    isAvailable: boolean;
}

export function ListComponentItem(props: ListComponentItemProps) {
    const mainColor = props.institutionType === InstitutionType.NURSERY ? "primary" : "secondary";
    const imagePath = props.institutionType === InstitutionType.NURSERY ? '/images/nursery-placeholder.jpg' : '/images/child-club-placeholder.jpg';
    const imageAlt = "Photo created by DALL-E from OpenAI";

    return (
        <Link component={RouterLink} to={generatePath(PathConstants.INSTITUTION_DETAILS, { id: props.id })} underline='none'>
            <ListItem sx={{ display: 'block' }}>
                <Card sx={{ display: 'flex', padding: 0, paddingRight: 2 }}>
                    <Box paddingLeft={2} paddingBottom={2} paddingTop={2}>
                        <CardMedia
                            component="img"
                            sx={{ display: { xs: 'none', sm: 'block' }, width: 120, height: 120, objectFit: 'cover', borderRadius: '10px' }}
                            image={imagePath}
                            alt={imageAlt}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                        <CardContent sx={{ flex: '1 0 auto', paddingRight: '0' }}>
                            <Box>
                                <Box display='flex' marginBottom={1} sx={{ justifyContent: 'space-between' }}>
                                    <Stack direction='row' spacing={1}>
                                        <Chip label={props.institutionType === InstitutionType.NURSERY ? 'ŻŁOBEK' : 'KLUB DZIECIĘCY'} color={mainColor} />
                                        {props.isAdaptedToDisabledChildren && <Chip label={<Accessible fontSize='small' />} color="info" />}
                                        {!props.isAvailable && <Chip label='Brak wolnych miejsc' color='error' />}
                                    </Stack>
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
                                    {props.name}
                                </Typography>
                                <Box display='flex' justifyContent='space-between'>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        <FmdGood />{props.city}
                                    </Typography>
                                    <ButtonGroup variant="text" aria-label="basic outlined button group" color={mainColor}>
                                        {props.phone && <Button aria-label='Zadzwoń do instytucji'>
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
