import { Box } from '@mui/material';
import InstitutionDetailsHeader from './InstitutionDetailsHeader';
import InstitutionDetailsDescription from './InstitutionDetailsDescription';
import { useContext, useEffect } from 'react';
import InstitutionDetailsTop from './InstitutionDetailsTop';
import { useSearchParams } from 'react-router-dom';
import { InstitutionContext } from '../../App';

export default function InstitutionDetails() {
	const { selectedInstitution, setSelectedInstitution } = useContext(InstitutionContext);
	const [queryParam] = useSearchParams();
	const regNo = queryParam.get('regNo');

	useEffect(() => {
		const fetchInstitution = async () => {
			const regNoUtf8 = regNo && encodeURIComponent(regNo);
			const response = await fetch(`${process.env.REACT_APP_API_URL}/institutions/${regNoUtf8}`);
			const institution = await response.json();
			setSelectedInstitution(institution);
		};
		fetchInstitution();
	}, [regNo, setSelectedInstitution]);

	return (
		<Box p={1} height='82.4vh'>
			{selectedInstitution && <InstitutionDetailsTop {...selectedInstitution} />}
			{selectedInstitution && <InstitutionDetailsHeader {...selectedInstitution} />}
			{selectedInstitution && <InstitutionDetailsDescription {...selectedInstitution} />}
		</Box>
	);
}