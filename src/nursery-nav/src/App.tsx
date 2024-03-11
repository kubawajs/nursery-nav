import { Grid } from "@mui/material";
import MapComponent, { MapComponentProps } from "./components/MapComponent/MapComponent";
import Navigation from "./components/Navigation/Navigation";
import ListComponent from "./components/ListComponent/ListComponent";
import data from "./data/test-data-100.json";
import { Institution } from "./shared/nursery.interface";
import React from "react";

const mapProps: MapComponentProps = {
  center: [52.00, 21.37]
};

export const InstitutionContext = React.createContext({
  institutions: data as unknown as Institution[],
});

export default function App() {
  const institutions = data as unknown as Institution[];

  return (
    <InstitutionContext.Provider value={{ institutions }}>
      <Grid container margin={0}>
        <Grid item xs={12}>
          <Navigation />
        </Grid>
        <Grid item xs={12} md={5} style={{ position: 'relative' }}>
          <ListComponent />
        </Grid>
        <Grid item xs={12} md={7} style={{ position: 'relative' }}>
          <MapComponent {...mapProps} />
        </Grid>
      </Grid>
    </InstitutionContext.Provider>
  );
}
