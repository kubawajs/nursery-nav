import { Marker, useMap } from "react-leaflet";
import { LocationOn } from '@mui/icons-material';
import { divIcon } from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import './MapPin.css';
import { useContext } from "react";
import { InstitutionContext } from "../../App";
import { Institution } from "../../shared/nursery.interface";

export interface MapPinProps {
    name: string,
    institution: Institution,
    pin: {
        latitude: number,
        longitude: number
    }
}

export default function MapPin(props: MapPinProps) {
    const map = useMap();
    const { setSelectedInstitution } = useContext(InstitutionContext);

    const position: [number, number] = [props.pin.latitude, props.pin.longitude];
    const iconMarkup = renderToStaticMarkup(
        <LocationOn fontSize={"large"} />
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
                    setSelectedInstitution(props.institution);
                }
            }}
            position={position}
            icon={pinIcon}>
        </Marker>
    );
}