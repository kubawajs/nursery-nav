import { MapContainer, TileLayer } from "react-leaflet";
import './MapComponent.css';
import { Container } from "@mui/material";
import MapPin from "../MapPin/MapPin";
import { Institution } from "../../shared/nursery.interface";

export interface MapComponentProps {
  institutions: Institution[];
}

export default function MapComponent(props: MapComponentProps) {
  return (
    <Container fixed>
      <MapContainer center={[52.11, 23.37]} zoom={7} scrollWheelZoom={true} zoomControl={false}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {props.institutions.map((institution, index) => (
          <MapPin key={index} name={institution.name} pin={ institution.address.pin } /> // Added conditional check for institution.pin
        ))}
      </MapContainer>
    </Container>
  );
}