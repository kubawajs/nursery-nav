import MapPage from "../../pages/MapPage";
import { getLocations } from "../../api/LocationsFetcher";

export const metadata = {
    title: `Wyszukiwarka Żłobków i Klubów Dziecięcych - widok mapy | ${process.env.NEXT_PUBLIC_NAME}`,
    description: `Znajdź idealny żłobek dla dziecka w najlepszej cenie PLN na miesiąc. Sprawdź dostępność miejsc i dowiedz się, gdzie ich brak. Poznaj nazwy żłobków w okolicy.`,
    image: `${process.env.NEXT_PUBLIC_API_URL}/images/favicon.ico`
}

export default async function Page() {
    const locations = await getLocations();
    const institutionIds = locations.map((location) => location.id);

    return (
        <>
            <MapPage locations={locations} institutionIds={institutionIds} />
        </>
    );
}