import { ThemeProvider } from "@emotion/react";
import { theme } from "../../shared/theme";
import React, { Suspense } from "react";
import { Institution } from "../../shared/nursery.interface";
import Navigation from "../Navigation/Navigation";
import { Outlet } from "react-router-dom";
import { CircularProgress, Grid } from "@mui/material";
import { HelmetProvider } from "react-helmet-async";
import ContactUs from "../ContactUs/ContactUs";

export const InstitutionContext = React.createContext({
    institutionIds: [] as number[],
    setInstitutionIds: (_ids: number[]) => { },
    selectedInstitution: null as Institution | null,
    setSelectedInstitution: (_institution: Institution | null) => { },
});

export default function Layout() {
    const [selectedInstitution, setSelectedInstitution] = React.useState<Institution | null>(null);
    const [institutionIds, setInstitutionIds] = React.useState<number[]>([]);

    return (
        <InstitutionContext.Provider value={{ institutionIds, setInstitutionIds, selectedInstitution, setSelectedInstitution }}>
            <ThemeProvider theme={theme}>
                <HelmetProvider>
                    <Navigation />
                    <Grid container>
                        <Suspense fallback={<CircularProgress />}>
                            <Outlet />
                        </Suspense>
                    </Grid>
                    <ContactUs />
                </HelmetProvider>
            </ThemeProvider>
        </InstitutionContext.Provider>
    );
}