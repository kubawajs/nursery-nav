import { Box } from '@mui/material';
import { Institution } from '../../shared/nursery.interface';
import InstitutionDetailsHeader from './InstitutionDetailsHeader';
import InstitutionDetailsDescription from './InstitutionDetailsDescription';
import { useContext, useEffect, useState } from 'react';
import { InstitutionContext } from '../../App';
import InstitutionDetailsTop from './InstitutionDetailsTop';
import { useSearchParams } from 'react-router-dom';

export default function InstitutionDetails() {
	const { selectedInstitution } = useContext(InstitutionContext);
	const [institution, setInstitution] = useState<Institution>();
	const [queryParam] = useSearchParams();
	const regNo = queryParam.get('regNo');

	useEffect(() => {
		const fetchInstitution = async () => {
			const regNoUtf8 = regNo && encodeURIComponent(regNo);
			const response = await fetch(`${process.env.REACT_APP_API_URL}/institutions/${regNoUtf8}`);
			const institution = await response.json();
			setInstitution(institution);
		};
		fetchInstitution();
	}, [regNo]);

	return (
		<Box p={1} height='82.4vh'>
			{selectedInstitution && <>
				<InstitutionDetailsTop {...selectedInstitution} /></>
			}
			{institution && <InstitutionDetailsHeader {...institution} />}
			{institution && <InstitutionDetailsDescription {...institution} />}
		</Box>
	);
}