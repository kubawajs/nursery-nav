import { Marker, Tooltip, useMap } from 'react-leaflet';
import { LocationOnOutlined } from '@mui/icons-material';
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
	const institutionType = props.institution.institutionType === 'Żłobek' ? 'nursery' : 'childclub';
	const iconBackgroundColor = `map-pin-icon map-pin-icon-${institutionType}`;

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
					<LocationOnOutlined
						className={iconBackgroundColor}
					/>
				),
				iconSize: [30, 30],
				className: 'map-pin-div-icon',
			})}
		>
			<Tooltip>{props.institution.name}</Tooltip>
		</Marker>
	);
}
