import { getCities } from "../api/CitiesFetcher";
import { getLocations } from "../api/LocationsFetcher";
import ListPage from "../pages/ListPage";

export const metadata = {
    title: `Darmowa Wyszukiwarka Żłobków i Klubów Dziecięcych | ${process.env.NEXT_PUBLIC_NAME}`,
    description: `Darmowa Wyszukiwarka Żłobków i Klubów Dziecięcych | ${process.env.NEXT_PUBLIC_NAME}`,
    image: `${process.env.NEXT_PUBLIC_API_URL}/images/favicon.ico`
};

export default async function Page() {
    const locations = await getLocations();
    const cities = await getCities();

    return (
        <>
            <ListPage locations={locations} cities={cities} />
        </>
    );
}