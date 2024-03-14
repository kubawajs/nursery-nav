import {
    Box, Card,
    CardContent,
    CardMedia,
    Link, ListItem,
    Typography
} from '@mui/material';
import { Language, Payment } from '@mui/icons-material';

interface ListComponentItemProps {
    name: string;
    institutionType: string;
    city: string;
    basicPricePerMonth: number;
    website: string;
}
export function ListComponentItem(props: ListComponentItemProps) {
    return (
        <ListItem sx={{ display: 'block' }}>
            <Card sx={{ display: 'flex' }}>
                <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image="https://source.unsplash.com/random"
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            {props.city}
                        </Typography>
                        <Typography component="div" variant="h5">
                            {props.name}
                        </Typography>
                        <Typography color="text.secondary">
                            <Payment /> {props.basicPricePerMonth} PLN / miesiąc
                        </Typography>
                        <Typography color="text.secondary">
                            <Link href={props.website}><Language /></Link>
                        </Typography>
                    </CardContent>
                </Box>
            </Card>
        </ListItem>
    );
}
