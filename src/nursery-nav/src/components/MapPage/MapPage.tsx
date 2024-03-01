import { MapContainer, TileLayer } from "react-leaflet";
import './MapPage.css';

function MapPage() {
  return (
    <div className="map-component">
      <MapContainer center={[52.11, 19.21]} zoom={7} scrollWheelZoom={true} zoomControl={false}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
    </div>
  );
}

export default MapPage;