'use client'

import { useEffect } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Marker, useMap } from 'react-leaflet';

import { divIcon } from 'leaflet';
import { Crib } from '@mui/icons-material';

import { InstitutionType } from '../../shared/nursery.interface';
import PathConstants from '../../shared/pathConstants';

import './MapPin.css';
import { useRouter } from 'next/navigation';

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
	const router = useRouter();

	// Update map view only if necessary
	useEffect(() => {
		if (props.selectedLocationLat !== undefined && props.selectedLocationLon !== undefined) {
			map.setView([props.selectedLocationLat, props.selectedLocationLon], 18, { animate: true });
		}
	}, [props.selectedLocationLat, props.selectedLocationLon, map]);

	const position: [number, number] = [props.latitude, props.longitude];
	const institutionType = props.institutionType === InstitutionType.NURSERY ? 'nursery' : 'childclub';
	const iconBackgroundColor = `map-pin-icon map-pin-icon-${institutionType}`;

	return (
		<Marker
			eventHandlers={{
				click: () => {
					router.push(`${PathConstants.INSTITUTION_DETAILS}/${props.id}`);
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
			title={`Szczegóły dla ${institutionType} o ID ${props.id}`}
		>
		</Marker>
	);
}
