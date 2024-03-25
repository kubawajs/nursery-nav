import { Box, FormControl, InputLabel, List, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { ReactNode, useContext, useState } from 'react';
import { InstitutionContext } from '../../App';
import { ListComponentItem } from './ListComponentItem';
import InstitutionDetails from '../InstitutionDetails/InstitutionDetails';
import { SortByAlpha, TrendingDown, TrendingUp } from '@mui/icons-material';

export default function ListComponent() {
	const { filteredInstitutions, selectedInstitution, setFilteredInstitutions, setSelectedInstitution } = useContext(InstitutionContext);
	const [sortingParam, setSortingParam] = useState('');

	if (selectedInstitution) {
		return (
			<InstitutionDetails {...selectedInstitution} />
		);
	}

	function handleChange(event: SelectChangeEvent<string>, child: ReactNode): void {
		setSortingParam(event.target.value);
		const sortedInstitutions = filteredInstitutions.sort((a, b) => {
			switch (event.target.value) {
				case 'price-inc':
					return a.basicPricePerMonth - b.basicPricePerMonth;
				case 'price-dec':
					return b.basicPricePerMonth - a.basicPricePerMonth;
				case 'name-inc':
					return a.name.localeCompare(b.name);
				case 'name-dec':
					return b.name.localeCompare(a.name);
				default:
					return 0;
			}
		});
		setSelectedInstitution(null);
		setSortingParam(event.target.value);
		setFilteredInstitutions([...sortedInstitutions]);
	}

	return (
		<Box component="section" style={{ overflow: 'auto', height: '100vh' }}>
			<Box p={2} display='flex' justifyContent='space-between' alignItems='end'>
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
			<List>
				{filteredInstitutions.map((institution, index) => (
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
