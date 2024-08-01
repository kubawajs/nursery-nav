import { Box } from '@mui/material';
import InstitutionDetailsHeader from './InstitutionDetailsHeader';
import InstitutionDetailsDescription from './InstitutionDetailsDescription';
import InstitutionDetailsTop from './InstitutionDetailsTop';
import { Institution } from '../../shared/nursery.interface';

export default function InstitutionDetails(institution: Institution) {
	return (
		<Box p={1} height='82.4vh'>
			{institution && <InstitutionDetailsTop {...institution} />}
			{institution && <InstitutionDetailsHeader {...institution} />}
			{institution && <InstitutionDetailsDescription {...institution} />}
		</Box>
	);
}