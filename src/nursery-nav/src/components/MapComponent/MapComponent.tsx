import { MapContainer, TileLayer } from "react-leaflet";
import './MapComponent.css';
import { Container } from "@mui/material";
import MapPin from "../MapPin/MapPin";
import { Institution } from "../../shared/nursery.interface";
import { useContext } from "react";
import { InstitutionContext } from "../../App";

export interface MapComponentProps {
  center: [number, number];
}

export default function MapComponent(props: MapComponentProps) {
  const institutionContext = useContext(InstitutionContext);

  return (
    <Container style={{ padding: 0 }}>
      <MapContainer center={props.center} zoom={7} scrollWheelZoom={true} zoomControl={false} style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {institutionContext.institutions.map((institution, index) => (
          <MapPin key={index} name={institution.name} pin={institution.address.pin} /> // Added conditional check for institution.pin
        ))}
      </MapContainer>
    </Container>
  );
}