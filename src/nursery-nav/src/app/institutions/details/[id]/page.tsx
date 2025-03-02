'use client'

import InstitutionDetailsPage from "../../../../pages/InstitutionDetailsPage";

async function getInstitutionDetails(id: number) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/institutions/${id}`);
    const institution = await response.json();
    return institution;
}


// const title = `${institution?.name} - ${institution?.address.city} (${institution?.address.voivodeship})`;
// const description = `Informacje o placówce wraz z lokalizacją na mapie - ${institution?.name} - ${institution?.address.city} (${institution?.address.voivodeship})`;
// const image = institution?.institutionType === 'NURSERY' ? '/images/nursery-placeholder.jpg' : '/images/child-club-placeholder.jpg';


export default async function Institution({ params }: { params: { id: number } }) {
    const institution = await getInstitutionDetails(params.id);
    return <InstitutionDetailsPage institution={institution} />;
}
