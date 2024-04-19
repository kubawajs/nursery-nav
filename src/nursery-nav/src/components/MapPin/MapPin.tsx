import { Marker, Popup, useMap } from 'react-leaflet';
import { Crib } from '@mui/icons-material';
import { divIcon } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { useContext, useEffect } from 'react';
import { InstitutionContext } from '../../App';
import { Institution, InstitutionType } from '../../shared/nursery.interface';
import './MapPin.css';
import { Box, Typography } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

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
	const [queryParam, setQueryParam] = useSearchParams();
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
	const institutionType = props.institution.institutionType === InstitutionType.NURSERY ? 'nursery' : 'childclub';
	const iconBackgroundColor = `map-pin-icon map-pin-icon-${institutionType}`;

	return (
		<Marker
			eventHandlers={{
				click: () => {
					setSelectedInstitution(props.institution);
					queryParam.set('regNo', props.institution.operatingEntity.regNoPosition);
					setQueryParam(queryParam);
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
