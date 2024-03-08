import { Marker, useMap } from "react-leaflet";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { divIcon } from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import './MapPin.css';

export interface MapPinProps {
    name: string,
    pin: {
        latitude: number,
        longitude: number
    }
}

export default function MapPin(props: MapPinProps) {
    const map = useMap();

    const position: [number, number] = [props.pin.latitude, props.pin.longitude];
    const iconMarkup = renderToStaticMarkup(
        <LocationOnIcon />
    );
    const pinIcon = divIcon({
        html: iconMarkup
    });

    return (
        <Marker
            eventHandlers={{
                click: () => {
                    map.setView([position[0], position[1]], 14, {
                        animate: true
                    });
                }
            }}
            position={position}
            icon={pinIcon}>
        </Marker>
    );
}