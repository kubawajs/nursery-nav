import { Box, FormControl, InputLabel, List, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { InstitutionContext } from '../../App';
import { ListComponentItem } from './ListComponentItem';
import InstitutionDetails from '../InstitutionDetails/InstitutionDetails';
import { SortByAlpha, TrendingDown, TrendingUp } from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';
import { InstitutionListItem } from '../../shared/nursery.interface';

export default function ListComponent() {
	const { selectedInstitution, setSelectedInstitution } = useContext(InstitutionContext);
	const [filteredInstitutions, setFilteredInstitutions] = useState<InstitutionListItem[]>([]);
	const [sortingParam, setSortingParam] = useState('');
	const [queryParam, setQueryParam] = useSearchParams();

	useEffect(() => {
		const fetchInstitutions = async () => {
			const response = await fetch(`${process.env.REACT_APP_API_URL}/institutions`);
			const institutions = await response.json();
			setFilteredInstitutions(institutions);
		};
		fetchInstitutions();
	}, [sortingParam, setFilteredInstitutions]);

	const handleChange = useCallback((event: SelectChangeEvent<string>, _child: ReactNode) => {
		setSortingParam(event.target.value);
		setSelectedInstitution(null);
	}, [setSelectedInstitution]);

	const handleSelectedInstitutionChange = useCallback((institution: InstitutionListItem) => {
		queryParam.set('regNo', institution.regNo);
		setQueryParam(queryParam);
		//setSelectedInstitution(institution);
	}, [queryParam, setQueryParam]);

	const institutionQueryParam = queryParam.get('regNo');
	if (institutionQueryParam) {
		//const institution = filteredInstitutions.find(institution => institution.regNo === institutionQueryParam);
		// if (institution) {
		// 	setSelectedInstitution(institution);
		// }
	}

	if (selectedInstitution) {
		return (
			<InstitutionDetails />
		);
	}

	return (
		<Box>
			<Box pl={2} pr={2} display='flex' justifyContent='space-between' alignItems='end'>
				<Typography variant='body2' color="text.secondary" gutterBottom>
					Znaleziono {filteredInstitutions.length} instytucji
				</Typography>
				<FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
					<InputLabel id="sorting-select-label">Sortowanie</InputLabel>
					<Select
						labelId="sorting-select-label"
						id="sorting-select"
						value={sortingParam}
						label="Sortowanie"
						onChange={handleChange}
					>
						<MenuItem value={'price-inc'}><TrendingUp /> Cena rosnąco</MenuItem>
						<MenuItem value={'price-dec'}><TrendingDown /> Cena malejąco</MenuItem>
						<MenuItem value={'name-inc'}><SortByAlpha /> Nazwa rosnąco</MenuItem>
						<MenuItem value={'name-dec'}><SortByAlpha /> Nazwa malejąco</MenuItem>
					</Select>
				</FormControl>
			</Box>
			<List component="section" style={{ overflowY: 'auto', height: '75.4vh' }}>
				{filteredInstitutions.map((institution, index) => (
					<Box key={index} onClick={() => handleSelectedInstitutionChange(institution)}>
						<ListComponentItem
							key={index}
							name={institution.name}
							institutionType={institution.institutionType}
							city={institution.city}
							basicPricePerMonth={institution.basicPricePerMonth}
							website={institution.website}
							phone={institution.phone}
							email={institution.email}
							isAdaptedToDisabledChildren={institution.isAdaptedToDisabledChildren}
						/>
					</Box>
				))}
			</List>
		</Box >
	);
}
