import { Box } from '@mui/material';
import InstitutionDetailsHeader from './InstitutionDetailsHeader';
import InstitutionDetailsDescription from './InstitutionDetailsDescription';
import { useContext, useEffect } from 'react';
import InstitutionDetailsTop from './InstitutionDetailsTop';
import { useParams } from 'react-router-dom';
import { InstitutionContext } from '../Layout/Layout';

export default function InstitutionDetails() {
	const { selectedInstitution, setSelectedInstitution } = useContext(InstitutionContext);
	const { id } = useParams<{ id: string }>();

	useEffect(() => {
		const fetchInstitution = async () => {
			const response = await fetch(`${process.env.REACT_APP_API_URL}/institutions/details/${id}`);
			const institution = await response.json();
			setSelectedInstitution(institution);
		};
		fetchInstitution();
	}, [id, setSelectedInstitution]);

	return (
		<Box p={1} height='82.4vh'>
			{selectedInstitution && <InstitutionDetailsTop {...selectedInstitution} />}
			{selectedInstitution && <InstitutionDetailsHeader {...selectedInstitution} />}
			{selectedInstitution && <InstitutionDetailsDescription {...selectedInstitution} />}
		</Box>
	);
}