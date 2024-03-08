import { Grid } from "@mui/material";
import MapComponent, { MapComponentProps } from "./components/MapComponent/MapComponent";
import Navigation from "./components/Navigation/Navigation";
import ListComponent, { ListComponentProps } from "./components/ListComponent/ListComponent";
import data from "./data/test-data.json";
import { Institution } from "./shared/nursery.interface";

const mapProps: MapComponentProps = {
  institutions: data as unknown as Institution[],
  center: [52.00, 21.37]
};

const listProps: ListComponentProps = {
  institutions: data as unknown as Institution[]
};

export default function App() {
  return (
    <Grid container margin={0}>
      <Grid item xs={12}>
        <Navigation />
      </Grid>
      <Grid item xs={12} md={5} style={{ position: 'relative' }}>
        <ListComponent {...listProps} />
      </Grid>
      <Grid item xs={12} md={7} style={{ position: 'relative' }}>
        <MapComponent {...mapProps} />
      </Grid>
    </Grid>
  );
}
