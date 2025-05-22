'use client'

import { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import {
	useParams,
} from 'react-router-dom';

import { Box, Button, Container, debounce } from '@mui/material';
import MarkerClusterGroup from 'react-leaflet-cluster'

import MapPin from '../MapPin/MapPin';

import { LocationResponse } from '../../shared/nursery.interface';

import './MapComponent.css';

interface MapComponentProps {
	locations: LocationResponse[];
	institutionIds?: number[];
}

const attributionText = 'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a href="https://openmaptiles.org/" target="_blank">© OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap</a> contributors';
const mapUrl = `https://maps.geoapify.com/v1/tile/positron/{z}/{x}/{y}.png?apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY}`;

function useFilteredLocations(locations: LocationResponse[], institutionIds: number[]) {
	return useMemo(() => {
		if (institutionIds.length === 0) {
			return locations;
		}

		return locations.filter((location) => institutionIds.includes(location.id));
	}, [locations, institutionIds]);
}

export default function MapComponent({ locations, institutionIds }: MapComponentProps) {
	const { id } = useParams();
	const [size, setSize] = useState({
		isXs: window.innerWidth < 600,
		isSm: window.innerWidth < 900,
	});
	const locationsFiltered = useFilteredLocations(locations, institutionIds ?? []);

	const selectedLocation = useMemo(
		() => id ? locations.find((location) => location.id === parseInt(id)) : undefined,
		[id, locations]
	);

	const markers = useMemo(() => locationsFiltered.map((location) => (
		<MapPin
			key={location.id}
			id={location.id}
			latitude={location.latitude}
			longitude={location.longitude}
			institutionType={location.institutionType}
			selectedLocationLat={selectedLocation?.latitude}
			selectedLocationLon={selectedLocation?.longitude}
		/>
	)), [locationsFiltered, selectedLocation]);

	useEffect(() => {
		const handleResize = debounce(() => {
			setSize({
				isXs: window.innerWidth < 600,
				isSm: window.innerWidth < 900,
			});
		}, 200);

		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
			handleResize.clear();
		}
	}, []);

	return (
		<Box>
			<Box display={{ xs: 'block', md: 'none' }} zIndex='100' position='fixed' p={1}>
				<Button variant='contained'>
					Powrót
				</Button>
			</Box>
			<Container style={{ padding: 0 }}>
				<MapContainer
					preferCanvas={true}
					center={[52.5, 19.14]}
					zoom={size.isXs ? 6 : 7}
					scrollWheelZoom={true}
					zoomControl={false}
					style={{ position: 'fixed', top: 0, bottom: 0, width: size.isSm ? '100%' : '50%' }}
				>
					<TileLayer
						attribution={attributionText}
						url={mapUrl}
						maxZoom={20}
					/>
					<MarkerClusterGroup
						className="marker-cluster-group"
						polygonOptions={{ opacity: 0 }}
						chunkedLoading
					>
						{markers}
					</MarkerClusterGroup>
				</MapContainer>
			</Container>
		</Box>
	);
}
