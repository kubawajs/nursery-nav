import {
	Box,
	Breadcrumbs,
	Button,
	Card,
	CardActions,
	CardContent,
	List,
	ListItem,
	Typography
} from '@mui/material';
import { useContext } from 'react';
import { Payment } from '@mui/icons-material';
import InstitutionDetails from '../InstitutionDetails/InstitutionDetails';
import { InstitutionContext } from '../../App';

interface ListComponentItemProps {
	name: string;
	institutionType: string;
	city: string;
	basicPricePerMonth: number;
	website: string;
}

function ListComponentItem(props: ListComponentItemProps) {
	return (
		<ListItem sx={{ display: 'block' }}>
			<Card variant="elevation">
				<CardContent>
					<Typography sx={{ fontSize: 11 }} color="text.secondary" gutterBottom>
						{props.institutionType}
					</Typography>
					<Typography sx={{ mb: 1.0 }} color="text.secondary" gutterBottom>
						{props.city}
					</Typography>
					<Typography sx={{ mb: 1.5 }} color="text.primary">
						{props.name}
					</Typography>
					<Typography sx={{ mb: 1.2 }} color="text.secondary">
						<Payment /> {props.basicPricePerMonth} PLN / miesiąc
					</Typography>
				</CardContent>
				<CardActions>
					<Button variant="contained" href={props.website}>
						Strona www
					</Button>
				</CardActions>
			</Card>
		</ListItem>
	);
}

export default function ListComponent() {
	const { institutions, selectedInstitution, setSelectedInstitution } =
		useContext(InstitutionContext);

	if (selectedInstitution) {
		return (
			<Box>
				<Breadcrumbs aria-label="breadcrumb">
					<Typography color="text.light">{selectedInstitution.address.voivodeship}</Typography>
					<Typography color="text.light">{selectedInstitution.address.county}</Typography>
					<Typography color="text.primary">{selectedInstitution.address.city}</Typography>
				</Breadcrumbs>
				<Button variant="contained" onClick={() => setSelectedInstitution(null)}>
					Powrót
				</Button>
				<InstitutionDetails {...selectedInstitution} />
			</Box>
		);
	}

	return (
		<Box component="section" style={{ overflow: 'auto', height: '100vh' }}>
			<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
				Znaleziono {institutions.length} instytucji
			</Typography>
			<List>
				{institutions.map((institution, index) => (
					<Box key={index} onClick={() => setSelectedInstitution(institution)}>
						<ListComponentItem
							key={index}
							name={institution.name}
							institutionType={institution.institutionType}
							city={institution.address.city}
							basicPricePerMonth={institution.basicPricePerMonth}
							website={institution.website}
						/>
					</Box>
				))}
			</List>
		</Box>
	);
}
