import './global.css';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Grid2, ThemeProvider } from "@mui/material";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Metadata } from "next";
import { Roboto } from 'next/font/google';
import ContactUs from "../components/ContactUs/ContactUs";
import Navigation from "../components/Navigation/Navigation";
import { theme } from '../shared/theme';

const roboto = Roboto({
    subsets: ['latin'],
    display: 'swap',
    weight: ["100", "300", "400", "500", "700", "900"],
})

export const metadata: Metadata = {
    title:
        "ZnajdzZlobek.pl | Darmowa wyszukiwarka żłobków",
    description:
        "Znajdź idealny żłobek dla dziecka w najlepszej cenie PLN na miesiąc. Sprawdź dostępność miejsc i dowiedz się, gdzie ich brak. Poznaj nazwy żłobków w okolicy.",
};

export const viewport = {
    themeColor: "#98d9ff",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="pl" className={roboto.className}>
            <head>
                <link rel="apple-touch-icon" href="/logo192.png" />
            </head>

            <body>
                <AppRouterCacheProvider>
                    <ThemeProvider theme={theme}>
                        <SpeedInsights />
                        <Navigation />
                        <main>
                            <Grid2 container>
                                {children}
                            </Grid2>
                        </main>
                        <ContactUs />
                    </ThemeProvider>
                </AppRouterCacheProvider>
            </body>
        </html >
    );
}