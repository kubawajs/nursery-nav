import { ThemeProvider } from "@emotion/react";
import { theme } from "../../shared/theme";
import React, { Suspense } from "react";
import { Institution } from "../../shared/nursery.interface";
import Navigation from "../Navigation/Navigation";
import { Outlet } from "react-router-dom";
import { CircularProgress, Grid } from "@mui/material";
import FiltersBar from "../Filters/FiltersBar";

export const InstitutionContext = React.createContext({
    filtersQuery: '',
    setFiltersQuery: (_query: string) => { },
    selectedInstitution: null as Institution | null,
    setSelectedInstitution: (_institution: Institution | null) => { },
});

export default function Layout() {
    const [selectedInstitution, setSelectedInstitution] = React.useState<Institution | null>(null);
    const [filtersQuery, setFiltersQuery] = React.useState('');

    return (
        <InstitutionContext.Provider value={{ filtersQuery, setFiltersQuery, selectedInstitution, setSelectedInstitution }}>
            <ThemeProvider theme={theme}>
                <Navigation />
                <Grid container>
                    <Grid item xs={12} zIndex={19}>
                        <FiltersBar />
                    </Grid>
                    <Suspense fallback={<CircularProgress />}>
                        <Outlet />
                    </Suspense>
                </Grid>
            </ThemeProvider>
        </InstitutionContext.Provider>
    );
}