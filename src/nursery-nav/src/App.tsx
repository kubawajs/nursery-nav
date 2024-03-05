import { Grid } from "@mui/material";
import MapComponent, { MapComponentProps } from "./components/MapComponent/MapComponent";
import Navigation from "./components/Navigation/Navigation";
import ListComponent from "./components/ListComponent/ListComponent";
import data from "./data/test-data.json";
import { Institution } from "./shared/nursery.interface";

const mapProps: MapComponentProps = {
  institutions: data as unknown as Institution[]
};

function App() {
  console.log(mapProps);
  console.log(typeof(mapProps));
  return (
    <Grid container>
      <Grid item xs={12}>
        <Navigation />
      </Grid>
      <Grid item xs={12} md={5}>
        <ListComponent />
      </Grid>
      <Grid item xs={12} md={7}>
        <MapComponent {...mapProps} />
      </Grid>
    </Grid>
  );
}

export default App;
