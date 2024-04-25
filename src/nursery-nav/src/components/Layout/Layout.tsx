import { ThemeProvider } from "@emotion/react";
import { theme } from "../../shared/theme";
import FiltersBar from "../Filters/FiltersBar";
import React, { Suspense } from "react";
import { Institution } from "../../shared/nursery.interface";
import Navigation from "../Navigation/Navigation";
import { Outlet } from "react-router-dom";
import { CircularProgress } from "@mui/material";

export const InstitutionContext = React.createContext({
    selectedInstitutionRegNo: null as string | null,
    setSelectedInstitutionRegNo: (_regNo: string | null) => { },
    selectedInstitution: null as Institution | null,
    setSelectedInstitution: (_institution: Institution | null) => { },
});

export default function Layout() {
    const [selectedInstitution, setSelectedInstitution] = React.useState<Institution | null>(null);
    const [selectedInstitutionRegNo, setSelectedInstitutionRegNo] = React.useState<string | null>(null);

    return (
        <InstitutionContext.Provider value={{ selectedInstitutionRegNo, setSelectedInstitutionRegNo, selectedInstitution, setSelectedInstitution }}>
            <ThemeProvider theme={theme}>
                <Navigation />
                <FiltersBar />
                <Suspense fallback={<CircularProgress />}>
                    <Outlet />
                </Suspense>
            </ThemeProvider>
        </InstitutionContext.Provider>
    );
}