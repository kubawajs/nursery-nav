import { Metadata } from "next";
import { getCities } from "../../../../api/CitiesFetcher";
import { getInstitutions } from "../../../../api/InstitutionsFetcher";
import { getLocations } from "../../../../api/LocationsFetcher";
import ListPage from "../../../../pages/ListPage";

export async function generateMetadata(
    { params }: { params: Promise<{ voivodeship: string, city: string }> }): Promise<Metadata> {

    const voivodeship = decodeURIComponent((await params).voivodeship);
    const city = decodeURIComponent((await params).city);

    return {
        title: `${city} (${voivodeship}) - Żłobki w mieście | ${process.env.NEXT_PUBLIC_NAME}`,
        description: `Informacje o placówkach w mieście - ${city} (${voivodeship})`,
        //image = institution?.institutionType === 'NURSERY' ? '/images/nursery-placeholder.jpg' : '/images/child-club-placeholder.jpg';
    }
}

export default async function Page({ params }: { params: Promise<{ voivodeship: string, city: string }> }) {
    const voivodeship = decodeURIComponent((await params).voivodeship);
    const city = decodeURIComponent((await params).city);
    const institutions = await getInstitutions(new URLSearchParams({ voivodeship: voivodeship, city: city }), null);
    if (institutions.totalItems === 0) {
        return (
            <div>
                <h1>Brak wyników</h1>
            </div>
        );
    }
    const locations = await getLocations();
    const cities = await getCities();

    return (
        <>
            <ListPage locations={locations} cities={cities} />
        </>
    );
}