import { Metadata } from "next";
import { getCities } from "../../../api/CitiesFetcher";
import { getInstitutions } from "../../../api/InstitutionsFetcher";
import { getLocations } from "../../../api/LocationsFetcher";
import ListPage from "../../../pages/ListPage";

export async function generateMetadata(
    { params }: { params: Promise<{ voivodeship: string }> }): Promise<Metadata> {

    const voivodeship = decodeURIComponent((await params).voivodeship);

    return {
        title: `${voivodeship} - Żłobki w województwie | ${process.env.NEXT_PUBLIC_NAME}`,
        description: `Informacje o placówkach w województwie - ${voivodeship}`,
        //image = institution?.institutionType === 'NURSERY' ? '/images/nursery-placeholder.jpg' : '/images/child-club-placeholder.jpg';
    }
}

export default async function Page({ params }: { params: Promise<{ voivodeship: string }> }) {
    const voivodeship = decodeURIComponent((await params).voivodeship);
    const institutions = await getInstitutions(new URLSearchParams({ voivodeship: voivodeship }), null);
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