import {
	Box,
	List,
	Typography
} from '@mui/material';
import { useContext } from 'react';
import { InstitutionContext } from '../../App';
import { ListComponentItem } from './ListComponentItem';
import InstitutionDetails from '../InstitutionDetails/InstitutionDetails';

export default function ListComponent() {
	const { institutions, selectedInstitution, setSelectedInstitution } = useContext(InstitutionContext);

	if (selectedInstitution) {
		return (
			<InstitutionDetails {...selectedInstitution} />
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
							phone={institution.phone}
							email={institution.email}
						/>
					</Box>
				))}
			</List>
		</Box>
	);
}
