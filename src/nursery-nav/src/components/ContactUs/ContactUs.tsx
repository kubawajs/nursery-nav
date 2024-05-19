import { ChatBubble } from "@mui/icons-material";
import { Fab } from "@mui/material";

export default function ContactUs() {
    return (
        <Fab color="secondary" aria-label="Skontaktuj się z nami" sx={{ position: 'absolute', right: '0.5rem', bottom: '0.5rem' }}>
            <ChatBubble />
        </Fab>
    )
};