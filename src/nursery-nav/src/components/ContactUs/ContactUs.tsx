import { ChatBubble } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab } from "@mui/material";
import { useState } from "react";

export default function ContactUs() {
    const [open, setOpen] = useState(false);
    const contactMail = process.env.NEXT_PUBLIC_CONTACT_MAIL;

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        contactMail ? <>
            <Fab color="secondary" aria-label="Skontaktuj się z nami"
                sx={{ position: 'fixed', right: '0.5rem', bottom: '0.5rem', color: '#fff' }}
                onClick={handleClickOpen}>
                <ChatBubble />
            </Fab>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle variant="h3">
                    Skontaktuj się z nami
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Jeśli masz pytania, uwagi lub sugestie, skontaktuj się z nami.
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick={handleClose}>Anuluj</Button>
                        <Button href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_MAIL}`} onClick={handleClose}>Wyślij e-mail</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </> : <></>
    )
};