import { Marker } from "react-leaflet";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { divIcon } from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import './MapPin.css';

export default function MapPin() {
    const position: [number, number] = [49.64, 20.50];
    const iconMarkup = renderToStaticMarkup(
        <LocationOnIcon />
    );
    const pinIcon = divIcon({
        html: iconMarkup
    });

    return (
        <Marker position={position} icon={pinIcon}>
        </Marker>
    );
}