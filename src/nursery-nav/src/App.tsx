import { Grid } from "@mui/material";
import MapComponent from "./components/MapComponent/MapComponent";
import Navigation from "./components/Navigation/Navigation";
import ListComponent from "./components/ListComponent/ListComponent";

function App() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Navigation />
      </Grid>
      <Grid item xs={12} md={5}>
        <ListComponent />
      </Grid>
      <Grid item xs={12} md={7}>
        <MapComponent />
      </Grid>
    </Grid>
  );
}

export default App;
