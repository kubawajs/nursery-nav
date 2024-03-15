import { Marker, useMap } from 'react-leaflet';
import { LocationOn } from '@mui/icons-material';
import { divIcon } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { useContext } from 'react';
import { InstitutionContext } from '../../App';
import { Institution } from '../../shared/nursery.interface';
import './MapPin.css';

export interface MapPinProps {
	name: string;
	institution: Institution;
	pin: {
		latitude: number;
		longitude: number;
	};
}

export default function MapPin(props: MapPinProps) {
	const map = useMap();
	const { setSelectedInstitution } = useContext(InstitutionContext);
	const position: [number, number] = [props.pin.latitude, props.pin.longitude];

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
			icon={divIcon({
				html: renderToStaticMarkup(
					<LocationOn
						fontSize="large"
						className="map-pin-icon"
					/>
				),
				iconSize: [30, 30],
				className: 'map-pin-div-icon',
			})}
		></Marker>
	);
}
