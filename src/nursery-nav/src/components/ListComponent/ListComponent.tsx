import { Box, Button, CircularProgress, FormControl, InputLabel, List, MenuItem, Select, SelectChangeEvent, Stack, Typography } from '@mui/material';
import { ReactNode, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { ListComponentItem } from './ListComponentItem';
import { Map, SortByAlpha, TrendingDown, TrendingUp } from '@mui/icons-material';
import { InstitutionListItem } from '../../shared/nursery.interface';
import { InstitutionContext } from '../Layout/Layout';
import { useSearchParams } from 'react-router-dom';
import {
	Link as RouterLink,
	generatePath,
} from 'react-router-dom';
import PathConstants from '../../shared/pathConstants';

export default function ListComponent() {
	const { setInstitutionIds, setSelectedInstitution } = useContext(InstitutionContext);
	const [searchParams, setSearchParams] = useSearchParams();
	setSelectedInstitution(null);

	const [institutions, setInstitutions] = useState<InstitutionListItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [pageNum, setPageNum] = useState(2);
	const [totalPages, setTotalPages] = useState(1);
	const [totalItems, setTotalItems] = useState(0);
	const [itemsToCompare, setItemsToCompare] = useState<number[]>([]);

	const loaderRef = useRef(null);

	const fetchInstitutions = useCallback(async () => {
		if (loading || pageNum > totalPages) return;

		setLoading(true);
		const res = await fetch(`${process.env.REACT_APP_API_URL}/institutions?page=${pageNum}&${searchParams}`);
		const data = await res.json() as { items: InstitutionListItem[], totalItems: number, totalPages: number };
		setInstitutions((prevInstitutions) => [...prevInstitutions, ...data.items]);
		setPageNum((prevPageNum) => prevPageNum + 1);
		setLoading(false);
	}, [pageNum, loading, totalPages, searchParams]);

	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			const target = entries[0];
			if (target.isIntersecting) {
				fetchInstitutions();
			}
		});

		const bottom = loaderRef.current;
		if (bottom) {
			observer.observe(bottom);
		}

		return () => {
			if (bottom) {
				observer.unobserve(bottom);
			}
		};
	}, [fetchInstitutions]);

	useEffect(() => {
		const getData = async () => {
			setLoading(true);
			try {
				const res = await fetch(`${process.env.REACT_APP_API_URL}/institutions?${searchParams}`);
				const data = await res.json() as { items: InstitutionListItem[], ids: number[], totalItems: number, totalPages: number };
				setInstitutions(data.items);
				setTotalItems(data.totalItems);
				setTotalPages(data.totalPages);
				setInstitutionIds(data.ids);
			} catch (error) {
				console.log(error);
			}
			setLoading(false);
		};

		getData();
	}, [searchParams, setInstitutionIds]);

	useEffect(() => {
		const itemsToCompare = JSON.parse(localStorage.getItem('itemsToCompare') || '[]') as number[];
		setItemsToCompare(itemsToCompare);
	}, [itemsToCompare]);

	const handleChange = useCallback((event: SelectChangeEvent<string>, _child: ReactNode) => {
		searchParams.set('sort', event.target.value);
		setSearchParams(searchParams);
	}, [searchParams, setSearchParams]);

	return (
		<Box>
			<Box display={{ xs: 'flex', md: 'none' }} pt={3} pb={3} justifyContent='center' sx={{ backgroundImage: `url(${"/images/map-mobile-background.png"})` }}>
				<Button component={RouterLink} to={generatePath(PathConstants.MAP)} variant='contained' color='success'>
					<Map /> Zobacz na mapie
				</Button>
			</Box>
			<Box p={2}>
				<Stack direction={{ xs: 'column', md: 'row' }} spacing={1} justifyContent='space-between' alignItems='center'>
					<Button variant='contained' color='success' disabled={itemsToCompare.length < 1 || itemsToCompare.length > 5} href={`${generatePath(PathConstants.COMPARISON)}?ids=${itemsToCompare.join(',')}`}>
						Porównanie ({itemsToCompare.length}/5)
					</Button>

					{institutions && (
						<Typography variant='body2' color="text.secondary" gutterBottom>
							Znaleziono {totalItems} placówek
						</Typography>
					)}

					<FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
						<InputLabel id="sorting-select-label">Sortowanie</InputLabel>
						<Select
							labelId="sorting-select-label"
							id="sorting-select"
							value={searchParams.get('sort') || 'name-asc'}
							label="Sortowanie"
							onChange={handleChange}
						>
							<MenuItem value={'price-asc'}><TrendingUp /> Cena rosnąco</MenuItem>
							<MenuItem value={'price-desc'}><TrendingDown /> Cena malejąco</MenuItem>
							<MenuItem value={'name-asc'}><SortByAlpha /> Nazwa rosnąco</MenuItem>
							<MenuItem value={'name-desc'}><SortByAlpha /> Nazwa malejąco</MenuItem>
						</Select>
					</FormControl>
				</Stack>
			</Box><List component="section" style={{ overflowY: 'auto', height: '75.4vh' }}>
				{institutions && institutions.length > 0 && institutions.map((institution, index) => (
					<Box key={index}>
						<ListComponentItem
							key={institution.id}
							name={institution.name}
							id={institution.id}
							institutionType={institution.institutionType}
							city={institution.city}
							basicPricePerHour={institution.basicPricePerHour}
							basicPricePerMonth={institution.basicPricePerMonth}
							website={institution.website}
							phone={institution.phone}
							email={institution.email}
							isAdaptedToDisabledChildren={institution.isAdaptedToDisabledChildren}
							isAvailable={institution.isAvailable} />
					</Box>
				))}
				<div ref={loaderRef}>
					{loading &&
						<Box p={10} display='flex' justifyContent='center' alignItems='center'>
							<CircularProgress />
						</Box>}
				</div>
			</List>
		</Box >
	);
}
