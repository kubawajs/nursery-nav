import { MapContainer, TileLayer } from 'react-leaflet';
import { Container } from '@mui/material';
import MapPin from '../MapPin/MapPin';
import { useContext } from 'react';
import { InstitutionContext } from '../../App';
import MarkerClusterGroup from 'react-leaflet-cluster'
import './MapComponent.css';

export interface MapComponentProps {
	center: [number, number];
}

export default function MapComponent(props: MapComponentProps) {
	const { institutions, selectedInstitution } = useContext(InstitutionContext);
	console.log(selectedInstitution);

	return (
		<Container style={{ padding: 0 }}>
			<MapContainer
				center={props.center}
				zoom={7}
				scrollWheelZoom={true}
				zoomControl={false}
				style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<MarkerClusterGroup
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
