import logo from "../public/images/logo.png";

export default function About() {
    return (
        <div className="p-4">
            <div className="bg-white shadow-md p-4">
                <div className="flex flex-col space-y-4">
                    <div className="flex justify-center text-center">
                        <img src={logo.src} alt="" width="200px" />
                    </div>
                    <h1 className="text-4xl text-center">O projekcie</h1>
                    <p className="text-base">
                        Celem projektu <a href="/" className="text-blue-500"></a> jest ułatwienie rodzicom wyszukiwania pobliskich żłobków i przedszkoli.
                        Dzięki intuicyjnemu interfejsowi, użytkownicy mogą szybko znaleźć idealne miejsce dla swojego dziecka, spełniające ich wymagania i oczekiwania.
                    </p>
                    <h2 className="text-3xl text-center">Funkcje</h2>
                    <ul className="list-disc list-inside">
                        <li><strong>Mapa z pinezkami:</strong> Widok mapy pokazujący lokalizacje żłobków i przedszkoli.</li>
                        <li><strong>Szczegóły instytucji:</strong> Informacje o wybranej placówce.</li>
                        <li><strong>Porównanie instytucji:</strong> Porównanie cech wybranych placówek.</li>
                        <li><strong>Integracja z API:</strong> API z bieżąco aktualizowaną bazą danych</li>
                    </ul>
                    <h2 className="text-3xl text-center">Technologie</h2>
                    <p className="text-base">
                        Projekt wykorzystuje technologie takie jak React, Typescript, NestJS, oraz biblioteki MUI i React Leaflet.
                        Kod źródłowy aplikacji dostępny jest pod adresem URL: <a href="https://github.com/kubawajs/nursery-nav" className="text-blue-500">github.com/kubawajs/nursery-nav</a>.
                    </p>
                    <h2 className="text-3xl text-center">Dane</h2>
                    <p className="text-base">
                        Projekt wykorzystuje dane z serwisu Otwarte Dane.
                    </p>
                    <p className="text-base">
                        Źródło: <a href="https://dane.gov.pl/pl/dataset/2106,rejestr-zobkow-lista-instytucji" className="text-blue-500">Rejestr Żłobków - lista instytucji</a>.
                    </p>
                    <h2 className="text-3xl text-center">Autor</h2>
                    <div className="flex justify-center text-center">
                        <a href="www.wajs-dev.net"><img src="/author.png" alt="Author's logo" width="150px" height="150px" /></a>
                    </div>
                </div>
            </div>
        </div >
    );
}