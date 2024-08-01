import { Box, Button, Card, CardContent, Chip, Link, ListItem, Stack, Typography } from '@mui/material';
import { Accessible, FmdGood, Language, Mail, Phone } from '@mui/icons-material';
import { InstitutionType } from '../../shared/nursery.interface';
import PathConstants from '../../shared/pathConstants';
import { Link as RouterLink, generatePath } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';

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
    const mainColor = props.institutionType === InstitutionType.NURSERY ? 'primary' : 'secondary';
    const [compareItems, setCompareItems] = useState<number[]>([]);

    const handleCompare = useCallback((id: number) => {
        const itemsToCompare = JSON.parse(localStorage.getItem('itemsToCompare') || '[]') as number[];
        let updatedCompareItems: number[] = [];

        if (itemsToCompare.includes(id)) {
            updatedCompareItems = compareItems.filter(item => item !== id);
            itemsToCompare.splice(itemsToCompare.indexOf(id), 1);
        } else if (itemsToCompare.length <= 5) {
            updatedCompareItems = [...compareItems, id];
            itemsToCompare.push(id);
        }

        setCompareItems(updatedCompareItems);
        localStorage.setItem('itemsToCompare', JSON.stringify(itemsToCompare));
        window.dispatchEvent(new Event('storage'));
    }, [compareItems]);

    useEffect(() => {
        const handleStorageChange = () => {
            const itemsToCompare = JSON.parse(localStorage.getItem('itemsToCompare') || '[]') as number[];
            setCompareItems(itemsToCompare);
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const isDisabled = useMemo(() => compareItems.length >= 5 && !compareItems.includes(props.id), [compareItems, props.id]);
    const isAddMode = useMemo(() => !compareItems.includes(props.id), [compareItems, props.id]);

    return (
        <ListItem sx={{ display: 'block' }}>
            <Card sx={{ display: 'flex', padding: 0, paddingRight: 2, paddingLeft: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <CardContent sx={{ flex: '1 0 auto', paddingRight: '0' }}>
                        <Box>
                            <Box display='flex' marginBottom={1} sx={{ justifyContent: 'space-between' }}>
                                <Stack direction='row' spacing={1} alignItems='center'>
                                    <Chip label={props.institutionType === InstitutionType.NURSERY ? 'ŻŁOBEK' : 'KLUB DZIECIĘCY'} color={mainColor} />
                                    {props.isAdaptedToDisabledChildren && (
                                        <Chip label={<Accessible fontSize='small' />} color='info' sx={{ display: { xs: 'none', lg: 'flex' } }} />
                                    )}
                                </Stack>
                                <Typography component='span' variant='subtitle1' padding={0.25} fontWeight={700} textAlign={'end'}>
                                    {props.basicPricePerHour > 0 && <>{props.basicPricePerHour.toFixed(2)} PLN / godzina</>}
                                    {props.basicPricePerMonth > 0 && <>{props.basicPricePerMonth.toFixed(2)} PLN / miesiąc</>}
                                    {!props.basicPricePerMonth && !props.basicPricePerHour && <Typography variant='overline'>Brak danych</Typography>}
                                </Typography>
                            </Box>
                            <Box display='flex' justifyContent='space-between' alignItems='center'>
                                <Link component={RouterLink} to={generatePath(PathConstants.INSTITUTION_DETAILS, { id: props.id })} sx={{ textDecoration: 'none' }}>
                                    <Typography variant='h2' typography={{ xs: 'h5', md: 'h4' }} color='text.primary' paddingBottom={2}>
                                        {props.name}
                                    </Typography>
                                </Link>
                                <Stack direction='row' aria-label='Opcje kontaktu' justifyContent='flex-start' alignItems='center' spacing={2}>
                                    {props.phone && (
                                        <Link aria-label='Zadzwoń do placówki' href={`tel:${props.phone}`}>
                                            <Phone sx={{ fontSize: '1.25rem' }} />
                                        </Link>
                                    )}
                                    {props.email && (
                                        <Link aria-label='Napisz wiadomość email' href={`mailto:${props.email}`}>
                                            <Mail sx={{ fontSize: '1.25rem' }} />
                                        </Link>
                                    )}
                                    {props.website && (
                                        <Link aria-label='Odwiedź stronę internetową' href={props.website.startsWith('http') ? props.website : `http://${props.website}`}>
                                            <Language sx={{ fontSize: '1.25rem' }} />
                                        </Link>
                                    )}
                                </Stack>
                            </Box>
                            <Box display='flex' justifyContent='space-between' alignItems='center'>
                                <Typography variant='h4' typography='body1' color='text.secondary'>
                                    <FmdGood />{props.city}
                                </Typography>
                                <Button onClick={() => handleCompare(props.id)} disabled={isDisabled} color={isAddMode ? 'primary' : 'secondary'}>
                                    <Typography variant='button'>{isAddMode ? '+ Dodaj do' : '- Usuń z'} porównania</Typography>
                                </Button>
                            </Box>
                        </Box>
                    </CardContent>
                </Box>
            </Card>
        </ListItem>
    );
}
