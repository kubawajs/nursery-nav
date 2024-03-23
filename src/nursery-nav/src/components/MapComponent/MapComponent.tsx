import { MapContainer, TileLayer } from 'react-leaflet';
import { Container } from '@mui/material';
import MapPin from '../MapPin/MapPin';
import { useContext } from 'react';
import { InstitutionContext } from '../../App';
import MarkerClusterGroup from 'react-leaflet-cluster'
import './MapComponent.css';

export default function MapComponent() {
	const { institutions } = useContext(InstitutionContext);
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
					{institutions.map((institution, index) => (
						<MapPin
							key={index}
							name={institution.name}
							pin={institution.address.pin}
							institution={institution}
						/>
					))}
				</MarkerClusterGroup>
			</MapContainer>
		</Container>
	);
}
