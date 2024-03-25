import { Marker, Popup, useMap } from 'react-leaflet';
import { LocationOnOutlined } from '@mui/icons-material';
import { divIcon } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { useContext, useEffect } from 'react';
import { InstitutionContext } from '../../App';
import { Institution } from '../../shared/nursery.interface';
import './MapPin.css';
import { Box, Typography } from '@mui/material';

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
	const { selectedInstitution, setSelectedInstitution } = useContext(InstitutionContext);
	const zoomOnInstitution = (institution: Institution) => {
		map.setView([institution.address.pin.latitude, institution.address.pin.longitude], 18, {
			animate: true
		});
	};
	useEffect(() => {
		if (selectedInstitution !== null) {
			zoomOnInstitution(selectedInstitution);
		}
	});

	const position: [number, number] = [props.pin.latitude, props.pin.longitude];
	const institutionType = props.institution.institutionType === 'Żłobek' ? 'nursery' : 'childclub';
	const iconBackgroundColor = `map-pin-icon map-pin-icon-${institutionType}`;

	return (
		<Marker
			eventHandlers={{
				click: () => { setSelectedInstitution(props.institution); }
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
			<Popup>
				<Box>
					<Typography variant='subtitle1'>{props.institution.institutionType}</Typography>
					<Typography variant='h5'>{props.institution.name}</Typography>
					<Typography variant='body1'>{props.institution.address.fullAddress}</Typography>
				</Box>
			</Popup>
		</Marker>
	);
}
