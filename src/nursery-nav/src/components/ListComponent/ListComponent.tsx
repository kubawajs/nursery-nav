import { Box, FormControl, InputLabel, List, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { InstitutionContext } from '../../App';
import { ListComponentItem } from './ListComponentItem';
import InstitutionDetails from '../InstitutionDetails/InstitutionDetails';
import { SortByAlpha, TrendingDown, TrendingUp } from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';
import { Institution } from '../../shared/nursery.interface';

export default function ListComponent() {
	const { filteredInstitutions, selectedInstitution, setFilteredInstitutions, setSelectedInstitution } = useContext(InstitutionContext);
	const [sortingParam, setSortingParam] = useState('');
	const [queryParam, setQueryParam] = useSearchParams();
	const [sortedInstitutions, setSortedInstitutions] = useState<Institution[]>([]);

	useEffect(() => {
		const sortedInstitutions = filteredInstitutions.sort((a, b) => {
			switch (sortingParam) {
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
		setSortedInstitutions([...sortedInstitutions]);
	}, [sortingParam, filteredInstitutions, setFilteredInstitutions]);

	const handleChange = useCallback((event: SelectChangeEvent<string>, _child: ReactNode) => {
		setSortingParam(event.target.value);
		setSelectedInstitution(null);
	}, [setSelectedInstitution]);

	const handleSelectedInstitutionChange = useCallback((institution: Institution) => {
		queryParam.set('regNo', institution.operatingEntity.regNoPosition);
		setQueryParam(queryParam);
		setSelectedInstitution(institution);
	}, [queryParam, setQueryParam, setSelectedInstitution]);

	const institutionQueryParam = queryParam.get('regNo');
	if (institutionQueryParam) {
		const institution = filteredInstitutions.find(institution => institution.operatingEntity.regNoPosition === institutionQueryParam);
		if (institution) {
			setSelectedInstitution(institution);
		}
	}

	if (selectedInstitution) {
		return (
			<InstitutionDetails {...selectedInstitution} />
		);
	}

	return (
		<Box>
			<Box pl={2} pr={2} display='flex' justifyContent='space-between' alignItems='end'>
				<Typography variant='body2' color="text.secondary" gutterBottom>
					Znaleziono {sortedInstitutions.length} instytucji
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
				{sortedInstitutions.map((institution, index) => (
					<Box key={index} onClick={() => handleSelectedInstitutionChange(institution)}>
						<ListComponentItem
							key={index}
							name={institution.name}
							institutionType={institution.institutionType}
							city={institution.address.city}
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
