import { MapContainer, TileLayer } from 'react-leaflet';
import { Box, Button, Container } from '@mui/material';
import MapPin from '../MapPin/MapPin';
import { useContext, useEffect, useMemo, useState } from 'react';
import MarkerClusterGroup from 'react-leaflet-cluster'
import './MapComponent.css';
import { LocationResponse } from '../../shared/nursery.interface';
import { InstitutionContext } from '../Layout/Layout';
import {
	Link as RouterLink,
	generatePath,
	useParams,
} from 'react-router-dom';
import PathConstants from '../../shared/pathConstants';

interface MapComponentProps {
	locations: LocationResponse[];
	setIsMapLoaded: (isMapLoaded: boolean) => void;
}

export default function MapComponent({ locations, setIsMapLoaded }: MapComponentProps) {
	const { institutionIds } = useContext(InstitutionContext);
	const [locationsFiltered, setLocationsFiltered] = useState<LocationResponse[]>([]);

	const mapUrl = `https://maps.geoapify.com/v1/tile/positron/{z}/{x}/{y}.png?apiKey=${process.env.REACT_APP_GEOAPIFY_API_KEY}`;
	const attributionText = 'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a href="https://openmaptiles.org/" target="_blank">© OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap</a> contributors';
	const isXs = window.innerWidth < 600;
	const isSm = window.innerWidth < 900;

	const { id } = useParams();
	const selectedLocation = id ? locations.find((location) => location.id === parseInt(id)) : undefined;

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
		if (institutionIds.length === 0) {
			setLocationsFiltered(locations);
		}
		else {
			setLocationsFiltered(locations.filter((location) => institutionIds.includes(location.id)));
		}
	}, [institutionIds, locations]);

	return (
		<Box>
			<Box display={{ xs: 'block', md: 'none' }} zIndex='100' position='fixed' p={1}>
				<Button component={RouterLink} to={generatePath(PathConstants.HOME)} variant='contained'>
					Powrót
				</Button>
			</Box>
			<Container style={{ padding: 0 }}>
				<MapContainer
					preferCanvas={true}
					center={[52.5, 19.14]}
					zoom={isXs ? 6 : 7}
					scrollWheelZoom={true}
					zoomControl={false}
					style={{ position: 'fixed', top: 0, bottom: 0, width: isSm ? '100%' : '50%' }}
				>
					<TileLayer
						attribution={attributionText}
						url={mapUrl}
						maxZoom={20}
						eventHandlers={{
							load: () => setIsMapLoaded(true),
						}}
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
