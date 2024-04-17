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
			console.log(regNo);
			const regNoUtf8 = regNo && encodeURIComponent(regNo);
			const response = await fetch(`http://localhost:3000/institutions/${regNoUtf8}`);
			const institution = await response.json();
			setInstitution(institution);
		};
		fetchInstitution();
	}, [institution, regNo]);

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