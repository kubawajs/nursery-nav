import { Grid, ThemeProvider } from '@mui/material';
import MapComponent from './components/MapComponent/MapComponent';
import Navigation from './components/Navigation/Navigation';
import ListComponent from './components/ListComponent/ListComponent';
import data from './data/test-data-100.json';
import { Institution } from './shared/nursery.interface';
import React from 'react';
import { themeOptions } from './shared/theme';

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
      <Grid container margin={0}>
        <Grid item xs={12}>
          <Navigation />
        </Grid>
        <Grid item xs={12} md={5} style={{ position: 'relative' }}>
          <ListComponent />
        </Grid>
        <Grid item xs={12} md={7} style={{ position: 'relative' }}>
          <MapComponent />
        </Grid>
      </Grid>
    </InstitutionContext.Provider>
  );
}
