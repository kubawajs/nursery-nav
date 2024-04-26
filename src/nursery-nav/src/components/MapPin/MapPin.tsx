import { Marker, Popup, useMap } from 'react-leaflet';
import { Crib } from '@mui/icons-material';
import { divIcon } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { useContext, useEffect } from 'react';
import { InstitutionContext } from '../Layout/Layout';
import { Institution, InstitutionType } from '../../shared/nursery.interface';
import './MapPin.css';
import { Box, Typography } from '@mui/material';
import { useNavigate, generatePath } from 'react-router-dom';
import PathConstants from '../../shared/pathConstants';

export interface MapPinProps {
	institutionType: InstitutionType;
	regNo: string;
	latitude: number;
	longitude: number;
}

export default function MapPin(props: MapPinProps) {
	const map = useMap();
	const { selectedInstitution } = useContext(InstitutionContext);
	const navigate = useNavigate();
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

	const position: [number, number] = [props.latitude, props.longitude];
	const institutionType = props.institutionType === InstitutionType.NURSERY ? 'nursery' : 'childclub';
	const iconBackgroundColor = `map-pin-icon map-pin-icon-${institutionType}`;

	return (
		<Marker
			eventHandlers={{
				click: () => {
					let regNo = encodeURIComponent(props.regNo);
					navigate(generatePath(PathConstants.INSTITUTION_DETAILS, { regNo: regNo }));
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
			{selectedInstitution &&
				<Popup>
					<Box>
						<Typography variant='subtitle1'>{props.institutionType}</Typography>
						<Typography variant='h5'>{selectedInstitution?.name}</Typography>
						<Typography variant='body1'>{selectedInstitution?.address.fullAddress}</Typography>
					</Box>
				</Popup>
			}
		</Marker>
	);
}
