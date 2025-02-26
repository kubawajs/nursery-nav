import { Metadata } from "next";

export const metadata: Metadata = {
    title:
        "ZnajdzZlobek.pl | Darmowa wyszukiwarka żłobków",
    description:
        "Znajdź idealny żłobek dla dziecka w najlepszej cenie PLN na miesiąc. Sprawdź dostępność miejsc i dowiedz się, gdzie ich brak. Poznaj nazwy żłobków w okolicy.",
    themeColor: "#98d9ff",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="pl">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Mynerve&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
                    rel="stylesheet" />
                <link rel="apple-touch-icon" href="/logo192.png" />
            </head>
            <body>
                <div id="root">{children}</div>
            </body>
        </html>
    );
}