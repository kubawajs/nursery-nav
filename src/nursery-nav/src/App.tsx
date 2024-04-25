import { Grid, ThemeProvider } from '@mui/material';
import MapComponent from './components/MapComponent/MapComponent';
import Navigation from './components/Navigation/Navigation';
import { Institution } from './shared/nursery.interface';
import React from 'react';
import { theme } from './shared/theme';
import ListComponent from './components/ListComponent/ListComponent';
import FiltersBar from './components/Filters/FiltersBar';
import { BrowserRouter } from 'react-router-dom';

export const InstitutionContext = React.createContext({
  selectedInstitutionRegNo: null as string | null,
  setSelectedInstitutionRegNo: (_regNo: string | null) => { },
  selectedInstitution: null as Institution | null,
  setSelectedInstitution: (_institution: Institution | null) => { },
});

export default function App() {
  const [selectedInstitution, setSelectedInstitution] = React.useState<Institution | null>(null);

  return (
    <BrowserRouter>
      <InstitutionContext.Provider
        value={{
          selectedInstitutionRegNo: null,
          setSelectedInstitutionRegNo: (_regNo: string | null) => { },
          selectedInstitution,
          setSelectedInstitution
        }}
      >
        <ThemeProvider theme={theme}>
          <Navigation />
          <FiltersBar />
          <Grid container>
            <Grid item xs={12} md={8} lg={7} xl={6} style={{ position: 'relative' }}>
              <ListComponent />
            </Grid>
            <Grid item xs={12} md={4} lg={5} xl={6} style={{ position: 'relative' }}>
              <MapComponent />
            </Grid>
          </Grid>
        </ThemeProvider>
      </InstitutionContext.Provider>
    </BrowserRouter>
  );
}
