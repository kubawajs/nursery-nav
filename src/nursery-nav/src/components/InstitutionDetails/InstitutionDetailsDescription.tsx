import { Box, Paper, Typography, Chip, Button, Stack, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Institution, InstitutionType } from "../../shared/nursery.interface";
import styled from "@emotion/styled";
import { theme } from "../../shared/theme";
import InstitutionDetailsLinks from "./InstitutionDetailsLinks";
import { useState } from "react";

const DescriptionBox = styled(Box)(() => ({
    paddingBottom: theme.spacing(2),
}));

const ContactBox = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: theme.spacing(2),
    '& > *': {
        margin: theme.spacing(1),
    },
}));

export default function InstitutionDetailsDescription(institution: Institution) {
    const mainColor = institution.institutionType === InstitutionType.NURSERY ? 'primary' : 'secondary';
    const openingHours = institution.openingHours.split(': ')[1] ?? institution.openingHours;
    const isAvailable = institution.capacity - institution.kidsEnrolled > 0;

    const [discountText, setDiscountText] = useState<string>('');
    const [showDiscountDialog, setShowDiscountDialog] = useState<boolean>(false);

    const handleDiscountDialog = (discount: string) => {
        setDiscountText(discount);
        setShowDiscountDialog(true);
    }

    return (
        <Box p={2}>
            <Paper elevation={2}>
                <Box pb={2}>
                    <Typography variant="h2">Informacje</Typography>
                </Box>
                <DescriptionBox>
                    <Typography variant="h6">Dane adresowe</Typography>
                    <Typography variant="body1">{institution.address.fullAddress}</Typography>
                </DescriptionBox>
                <DescriptionBox>
                    <Typography variant="h6">Godziny otwarcia</Typography>
                    <Typography variant="body1">{openingHours}</Typography>
                </DescriptionBox>
                <DescriptionBox>
                    <Typography variant="h6">Liczba dostępnych miejsc</Typography>
                    {
                        isAvailable ?
                            <Chip label={`Dostępne miejsca: ${institution.capacity - institution.kidsEnrolled} (${institution.kidsEnrolled}/${institution.capacity} zajęte)`} color="success" />
                            :
                            <Chip label="Brak wolnych miejsc" color="error" />
                    }
                </DescriptionBox>
                <DescriptionBox>
                    <Typography variant="h6">Zniżki</Typography>
                    {institution.discounts &&
                        <Stack
                            direction="column"
                            spacing={0.5}
                            alignItems="flex-start"
                        >
                            {institution.discounts.map((discount, index) =>
                                <Chip key={index} label={discount} color={mainColor} onClick={() => handleDiscountDialog(discount)} />
                            )}
                            <Dialog open={showDiscountDialog}>
                                <DialogTitle variant="h3">
                                    Opis zniżki
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        {discountText}
                                    </DialogContentText>
                                    <DialogActions>
                                        <Button onClick={() => setShowDiscountDialog(false)}>Zamknij</Button>
                                    </DialogActions>
                                </DialogContent>
                            </Dialog>
                        </Stack>
                    }
                    {
                        !institution.discounts &&
                        <Typography variant="caption">Brak zniżek</Typography>
                    }
                </DescriptionBox>
                <ContactBox>
                    <Button variant="contained" color="success" href={`mailto:${institution.email}`}>Napisz wiadomość</Button>
                </ContactBox>
                <InstitutionDetailsLinks {...institution} />
            </Paper>
        </Box>
    );
}

