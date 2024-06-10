import { Grid } from "@mui/material";
import { Helmet } from "react-helmet-async";
import Comparison from "../components/Comparison/Comparison";
import { Institution, InstitutionType } from "../shared/nursery.interface";


export default function ComparisonPage() {
    const title = `Porównanie Żłobków i Klubów Dziecięcych | ${process.env.REACT_APP_NAME}`;
    const description = "Porównaj wybrane żłobki i kluby dziecięce. Sprawdź dostępność miejsc, ceny oraz opinie o placówkach.";
    const image = `${process.env.REACT_APP_API_URL}/images/favicon.ico`;

    const institutions: Institution[] = [
        {
            id: 1,
            institutionType: InstitutionType.CHILDCLUB,
            name: "Klub Dziecięcy 1",
            website: "https://example.com",
            email: "",
            phone: "",
            capacity: 12,
            kidsEnrolled: 5,
            basicPricePerMonth: 0,
            extendedStayOver10H: 12,
            basicPricePerHour: 50,
            foodPricePerMonth: 900,
            foodPricePerDay: undefined,
            discounts: [],
            openingHours: "Poniedziałek - Piątek: 8:00 - 16:00",
            isAdaptedToDisabledChildren: false,
            operatingEntity: {
                name: "Klub Dziecięcy Sp. z o.o.",
                address: "ul. Przykładowa 1, 00-000 Warszawa",
                nip: "1234567890",
                regon: "0987654321",
                regNoPosition: "000000000",
                website: "https://example.com"

            },
            businessActivitySuspended: false,
            address: {
                voivodeship: "mazowieckie",
                county: "Warszawa",
                city: "Warszawa",
                fullAddress: "ul. Przykładowa 1, 00-000 Warszawa",
                pin: {
                    latitude: 0,
                    longitude: 0
                }
            },
        },
        {
            id: 2,
            institutionType: InstitutionType.NURSERY,
            name: "Żłobek 2",
            website: "https://example.com",
            email: "",
            phone: "",
            capacity: 30,
            kidsEnrolled: 30,
            basicPricePerMonth: 1500,
            extendedStayOver10H: 15,
            basicPricePerHour: undefined,
            foodPricePerMonth: 0,
            foodPricePerDay: 25,
            discounts: ["Siblings discount"],
            openingHours: "Poniedziałek - Piątek: 7:00 - 18:00",
            isAdaptedToDisabledChildren: false,
            operatingEntity: {
                name: "Przedszkole Sp. z o.o.",
                address: "ul. Przykładowa 1, 00-000 Warszawa",
                nip: "1234567890",
                regon: "0987654321",
                regNoPosition: "000000000",
                website: "https://example.com"
            },
            businessActivitySuspended: false,
            address: {
                voivodeship: "mazowieckie",
                county: "Warszawa",
                city: "Warszawa",
                fullAddress: "ul. Przykładowa 1, 00-000 Warszawa",
                pin: {
                    latitude: 0,
                    longitude: 0
                }
            },
        },
        {
            id: 3,
            institutionType: InstitutionType.NURSERY,
            name: "Żłobek 3",
            website: "https://example.com",
            email: "",
            phone: "+48 123 456 789",
            capacity: 23,
            kidsEnrolled: 12,
            basicPricePerMonth: 1100,
            extendedStayOver10H: 10,
            basicPricePerHour: undefined,
            foodPricePerMonth: 0,
            foodPricePerDay: 20,
            discounts: ["Siblings discount"],
            openingHours: "Poniedziałek - Piątek: 7:00 - 17:00",
            isAdaptedToDisabledChildren: true,
            operatingEntity: {
                name: "Przedszkole Sp. z o.o.",
                address: "ul. Przykładowa 1, 00-000 Warszawa",
                nip: "1234567890",
                regon: "0987654321",
                regNoPosition: "000000000",
                website: "https://example.com"
            },
            businessActivitySuspended: false,
            address: {
                voivodeship: "mazowieckie",
                county: "Warszawa",
                city: "Warszawa",
                fullAddress: "ul. Przykładowa 1, 00-000 Warszawa",
                pin: {
                    latitude: 0,
                    longitude: 0
                }
            },
        }
    ];

    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={image} />
                <meta property="og:url" content={title} />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={image} />
                <meta name="twitter:card" content="summary_large_image" />
            </Helmet>
            <Grid item xs={12}>
                <Comparison {...institutions} />
            </Grid>
        </>
    );
}