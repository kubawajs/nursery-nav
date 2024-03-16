import { Grid, ThemeProvider } from '@mui/material';
import MapComponent from './components/MapComponent/MapComponent';
import Navigation from './components/Navigation/Navigation';
import data from './data/test-data-100.json';
import { Institution } from './shared/nursery.interface';
import React from 'react';
import { theme } from './shared/theme';
import ListComponent from './components/ListComponent/ListComponent';
import Filters from './components/Filters/Filters';

export const InstitutionContext = React.createContext({
  institutions: data as unknown as Institution[],
  selectedInstitution: null as Institution | null,
  setSelectedInstitution: (_institution: Institution | null) => { }
});

export default function App() {
  const institutions = data as unknown as Institution[];
  const [selectedInstitution, setSelectedInstitution] = React.useState<Institution | null>(null);

  return (
    <InstitutionContext.Provider
      value={{ institutions, selectedInstitution, setSelectedInstitution }}
    >
      <ThemeProvider theme={theme}>
        <Navigation />
        <Filters />
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
  );
}
