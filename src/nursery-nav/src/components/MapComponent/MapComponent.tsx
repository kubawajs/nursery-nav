import { MapContainer, TileLayer } from 'react-leaflet';
import { Container } from '@mui/material';
import MapPin from '../MapPin/MapPin';
import { useEffect, useState } from 'react';
import MarkerClusterGroup from 'react-leaflet-cluster'
import './MapComponent.css';
import { LocationResponse } from '../../shared/nursery.interface';

export default function MapComponent() {
	const [locations, setLocations] = useState<LocationResponse[]>([]);

	const fetchLocations = async () => {
		const res = await fetch(`${process.env.REACT_APP_API_URL}/locations`);
		const data = await res.json() as LocationResponse[];
		setLocations(data);
	};

	useEffect(() => {
		fetchLocations();
	}, []);

	return (
		<Container style={{ padding: 0 }}>
			<MapContainer
				center={[52.0, 19.37]}
				zoom={7}
				scrollWheelZoom={true}
				zoomControl={false}
				style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }}
			>
				<TileLayer
					attribution='Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a href="https://openmaptiles.org/" target="_blank">© OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap</a> contributors'
					url={`https://maps.geoapify.com/v1/tile/positron/{z}/{x}/{y}.png?apiKey=${process.env.REACT_APP_GEOAPIFY_API_KEY}`}
					maxZoom={20}
				/>
				<MarkerClusterGroup
					className="marker-cluster-group"
					polygonOptions={{ opacity: 0 }}
					chunkedLoading>
					{locations.map((location, index) => (
						<MapPin
							key={index}
							regNo={location.regNo}
							latitude={location.latitude}
							longitude={location.longitude}
							institutionType={location.institutionType}
						/>
					))}
				</MarkerClusterGroup>
			</MapContainer>
		</Container>
	);
}
