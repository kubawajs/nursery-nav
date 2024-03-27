import { Box } from '@mui/material';
import { Institution } from '../../shared/nursery.interface';
import InstitutionDetailsHeader from './InstitutionDetailsHeader';
import InstitutionDetailsDescription from './InstitutionDetailsDescription';
import { useContext } from 'react';
import { InstitutionContext } from '../../App';
import InstitutionDetailsTop from './InstitutionDetailsTop';

export default function InstitutionDetails(institution: Institution) {
	const { selectedInstitution } = useContext(InstitutionContext);

	return (
		<Box p={1} height='82.4vh'>
			{selectedInstitution && <>
				<InstitutionDetailsTop {...selectedInstitution} /></>
			}
			<InstitutionDetailsHeader {...institution} />
			<InstitutionDetailsDescription {...institution} />
		</Box>
	);
}