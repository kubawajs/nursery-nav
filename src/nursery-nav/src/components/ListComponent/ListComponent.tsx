import { Box, CircularProgress, FormControl, InputLabel, List, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { ReactNode, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { InstitutionContext } from '../../App';
import { ListComponentItem } from './ListComponentItem';
import InstitutionDetails from '../InstitutionDetails/InstitutionDetails';
import { SortByAlpha, TrendingDown, TrendingUp } from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';
import { InstitutionListItem } from '../../shared/nursery.interface';

export default function ListComponent() {
	const { selectedInstitution, setSelectedInstitution } = useContext(InstitutionContext);
	const [sortingParam, setSortingParam] = useState('');
	const [queryParam, setQueryParam] = useSearchParams();

	const [institutions, setInstitutions] = useState<InstitutionListItem[]>([]);

	const [pageNum, setPageNum] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [totalItems, setTotalItems] = useState(1);
	const [loading, setLoading] = useState(true);
	const bottom = useRef(null);

	useEffect(() => {
		async function fetchInstitutions() {
			setLoading(true);
			const res = await fetch(`${process.env.REACT_APP_API_URL}/institutions?page=${pageNum}`);
			const data = await res.json() as { items: InstitutionListItem[], totalItems: number, totalPages: number };
			setInstitutions(data.items);
			setTotalItems(data.totalItems);
			setTotalPages(data.totalPages);
			setLoading(false);
		}
		fetchInstitutions();
	}, [pageNum]);

	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) {
				const fetchMoreInstitutions = async () => {
					setPageNum(pageNum + 1);
					if (pageNum >= totalPages) return;

					setLoading(true);
					const res = await fetch(`${process.env.REACT_APP_API_URL}/institutions?page=${pageNum}`);
					const data = await res.json() as { items: InstitutionListItem[], totalItems: number, totalPages: number };
					setInstitutions((institutions) => [...institutions, ...data.items]);
					setLoading(false);
				};
				fetchMoreInstitutions();
			}
		});
		if (bottom.current) {
			observer.observe(bottom.current);
		}
	}, [pageNum, totalPages]);

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
				{institutions && (
					<Typography variant='body2' color="text.secondary" gutterBottom>
						Znaleziono {totalItems} instytucji
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
				<div ref={bottom} />
			</List>
			{loading &&
				<Box p={10} display='flex' justifyContent='center' alignItems='center'>
					<CircularProgress />
				</Box>
			}
		</Box >
	);
}
