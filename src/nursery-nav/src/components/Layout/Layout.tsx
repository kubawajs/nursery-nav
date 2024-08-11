import { ThemeProvider } from "@emotion/react";
import { theme } from "../../shared/theme";
import React from "react";
import Navigation from "../Navigation/Navigation";
import { Outlet } from "react-router-dom";
import { Grid } from "@mui/material";
import { HelmetProvider } from "react-helmet-async";
import ContactUs from "../ContactUs/ContactUs";

export const InstitutionContext = React.createContext({
    institutionIds: [] as number[],
    setInstitutionIds: (_ids: number[]) => { },
});

export default function Layout() {
    const [institutionIds, setInstitutionIds] = React.useState<number[]>([]);

    return (
        <InstitutionContext.Provider value={{ institutionIds, setInstitutionIds }}>
            <ThemeProvider theme={theme}>
                <HelmetProvider>
                    <Navigation />
                    <Grid container>
                        <Outlet />
                    </Grid>
                    <ContactUs />
                </HelmetProvider>
            </ThemeProvider>
        </InstitutionContext.Provider>
    );
}