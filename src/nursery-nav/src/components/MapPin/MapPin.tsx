import { Marker, useMap } from 'react-leaflet';
import { Crib } from '@mui/icons-material';
import { divIcon } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { InstitutionType } from '../../shared/nursery.interface';
import './MapPin.css';
import { useNavigate, generatePath } from 'react-router-dom';
import PathConstants from '../../shared/pathConstants';

export interface MapPinProps {
	institutionType: InstitutionType;
	id: number;
	latitude: number;
	longitude: number;
	selectedLocationLat?: number;
	selectedLocationLon?: number;
}

export default function MapPin(props: MapPinProps) {
	const map = useMap();
	const navigate = useNavigate();

	if (props.selectedLocationLat !== undefined && props.selectedLocationLon !== undefined) {
		map.setView([props.selectedLocationLat, props.selectedLocationLon], 18, {
			animate: true
		});
	}

	const position: [number, number] = [props.latitude, props.longitude];
	const institutionType = props.institutionType === InstitutionType.NURSERY ? 'nursery' : 'childclub';
	const iconBackgroundColor = `map-pin-icon map-pin-icon-${institutionType}`;

	return (
		<Marker
			eventHandlers={{
				click: () => {
					navigate(generatePath(PathConstants.INSTITUTION_DETAILS, { id: props.id }));
				}
			}}
			position={position}
			icon={divIcon({
				html: renderToStaticMarkup(
					<Crib
						className={iconBackgroundColor}
						fill='#fff'
					/>
				),
				iconSize: [30, 30],
				className: 'map-pin-div-icon',
			})}
		>
		</Marker>
	);
}
