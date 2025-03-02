import { Metadata } from "next";
import { Roboto } from 'next/font/google';

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
                <div id="root">{children}</div>
            </body>
        </html>
    );
}