import { Metadata } from "next";
import InstitutionDetailsPage from "../../../../pages/InstitutionDetailsPage";
import { getInstitutionDetails } from "../../../../api/InstitutionsFetcher";
import { getLocations } from "../../../../api/LocationsFetcher";

export async function generateMetadata(
    { params }: { params: Promise<{ id: number }> }): Promise<Metadata> {
    const id = (await params).id;
    const institution = await getInstitutionDetails(id);

    return {
        title: `${institution?.name} - ${institution?.address.city} (${institution?.address.voivodeship})`,
        description: `Informacje o placówce wraz z lokalizacją na mapie - ${institution?.name} - ${institution?.address.city} (${institution?.address.voivodeship})`,
        //image = institution?.institutionType === 'NURSERY' ? '/images/nursery-placeholder.jpg' : '/images/child-club-placeholder.jpg';
    }
}

export default async function Institution({ params }: { params: Promise<{ id: number }> }) {
    const institution = await getInstitutionDetails((await params).id);
    const locations = await getLocations();
    return (
        <>
            <InstitutionDetailsPage institution={institution} locations={locations} />
        </>
    );
}
