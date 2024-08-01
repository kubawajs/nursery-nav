import { Marker, Popup, useMap } from 'react-leaflet';
import { Crib } from '@mui/icons-material';
import { divIcon } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { useContext, useEffect, useCallback, useMemo } from 'react';
import { InstitutionContext } from '../Layout/Layout';
import { Institution, InstitutionType } from '../../shared/nursery.interface';
import './MapPin.css';
import { Box, Chip, Typography } from '@mui/material';
import { useNavigate, generatePath } from 'react-router-dom';
import PathConstants from '../../shared/pathConstants';

export interface MapPinProps {
	institutionType: InstitutionType;
	id: number;
	latitude: number;
	longitude: number;
}

export default function MapPin(props: MapPinProps) {
	const map = useMap();
	const { selectedInstitution } = useContext(InstitutionContext);
	const navigate = useNavigate();

	const zoomOnInstitution = useCallback((institution: Institution) => {
		map.setView([institution.address.pin.latitude, institution.address.pin.longitude], 18, {
			animate: true,
		});
	}, [map]);

	useEffect(() => {
		if (selectedInstitution) {
			zoomOnInstitution(selectedInstitution);
		}
	}, [selectedInstitution, zoomOnInstitution]);

	const position: [number, number] = useMemo(() => [props.latitude, props.longitude], [props.latitude, props.longitude]);
	const institutionType = useMemo(() => (props.institutionType === InstitutionType.NURSERY ? 'nursery' : 'childclub'), [props.institutionType]);
	const institutionLabel = useMemo(() => (props.institutionType === InstitutionType.NURSERY ? 'żłobek' : 'klub dziecięcy'), [props.institutionType]);
	const iconBackgroundColor = useMemo(() => `map-pin-icon map-pin-icon-${institutionType}`, [institutionType]);
	const mainColor = useMemo(() => (props.institutionType === InstitutionType.NURSERY ? "primary" : "secondary"), [props.institutionType]);

	const markerIcon = useMemo(() => (
		divIcon({
			html: renderToStaticMarkup(
				<Crib
					className={iconBackgroundColor}
					fill='#fff'
				/>
			),
			iconSize: [30, 30],
			className: 'map-pin-div-icon',
		})
	), [iconBackgroundColor]);

	return (
		<Marker
			eventHandlers={{
				click: () => {
					navigate(generatePath(PathConstants.INSTITUTION_DETAILS, { id: props.id }));
				}
			}}
			position={position}
			icon={markerIcon}
		>
			{selectedInstitution && (
				<Popup>
					<Box>
						<Chip label={institutionLabel.toLocaleUpperCase()} color={mainColor} sx={{ marginBottom: 1 }} />
						<Typography variant='h5'>{selectedInstitution.name}</Typography>
						<Typography variant='body1'>{selectedInstitution.address.fullAddress}</Typography>
					</Box>
				</Popup>
			)}
		</Marker>
	);
}
