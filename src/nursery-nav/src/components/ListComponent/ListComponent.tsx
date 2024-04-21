import { Box, CircularProgress, FormControl, InputLabel, List, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { InstitutionContext } from '../../App';
import { ListComponentItem } from './ListComponentItem';
import InstitutionDetails from '../InstitutionDetails/InstitutionDetails';
import { SortByAlpha, TrendingDown, TrendingUp } from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';
import { InstitutionListItem } from '../../shared/nursery.interface';
import useFetch from '../../shared/API/useFetch';

export default function ListComponent() {
	const { selectedInstitution, setSelectedInstitution } = useContext(InstitutionContext);
	const [sortingParam, setSortingParam] = useState('');
	const [queryParam, setQueryParam] = useSearchParams();

	const { data, isLoading } = useFetch(`${process.env.REACT_APP_API_URL}/institutions`) as { data: { items: InstitutionListItem[] } | null, isLoading: boolean };
	const [institutions, setInstitutions] = useState<InstitutionListItem[] | null>();

	useEffect(() => {
		if (data) {
			setInstitutions(data.items as InstitutionListItem[]);
		}
	}, [data]);

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
			{isLoading &&
				<Box p={10} display='flex' justifyContent='center' alignItems='center'>
					<CircularProgress />
				</Box>
			}

			<Box pl={2} pr={2} display='flex' justifyContent='space-between' alignItems='end'>
				{institutions && (
					<Typography variant='body2' color="text.secondary" gutterBottom>
						Znaleziono {institutions.length} instytucji
					</Typography>
				)}

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
				{institutions && institutions.length > 0 && institutions.map((institution, index) => (
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
