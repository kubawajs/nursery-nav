import { MapContainer, TileLayer } from "react-leaflet";
import './MapComponent.css';
import { Container } from "@mui/material";

function MapComponent() {
  return (
    <Container fixed>
      <MapContainer center={[52.11, 23.37]} zoom={7} scrollWheelZoom={true} zoomControl={false}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
    </Container>
  );
}

export default MapComponent;