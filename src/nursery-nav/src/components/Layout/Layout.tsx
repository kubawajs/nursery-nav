import { ThemeProvider } from "@emotion/react";
import { theme } from "../../shared/theme";
import React from "react";
import Navigation from "../Navigation/Navigation";
import { Outlet } from "react-router-dom";
import { Grid2 } from "@mui/material";
import { HelmetProvider } from "react-helmet-async";
import ContactUs from "../ContactUs/ContactUs";
import { SpeedInsights } from '@vercel/speed-insights/react';

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
                    <SpeedInsights />
                    <Navigation />
                    <Grid2 container>
                        <Outlet />
                    </Grid2>
                    <ContactUs />
                </HelmetProvider>
            </ThemeProvider>
        </InstitutionContext.Provider>
    );
}