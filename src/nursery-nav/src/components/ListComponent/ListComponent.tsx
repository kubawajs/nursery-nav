'use client'

import { Box, Button, FormControl, InputLabel, List, MenuItem, Paper, Select, SelectChangeEvent, Skeleton, Stack, Typography } from '@mui/material';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { ListComponentItem } from './ListComponentItem';
import { Clear, SortByAlpha, TrendingDown, TrendingUp } from '@mui/icons-material';
import { InstitutionListItem } from '../../shared/nursery.interface';
import { useSearchParams } from 'next/navigation';
import PathConstants from '../../shared/pathConstants';
import InfiniteScroll from 'react-infinite-scroller';
import { getInstitutions } from '../../api/InstitutionsFetcher';
import { useRouter } from 'next/navigation';
import { generatePath } from 'react-router-dom';
import Link from 'next/link';

export default function ListComponent() {
	const searchParams = useSearchParams();
	const router = useRouter();

	const [institutions, setInstitutions] = useState<InstitutionListItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [pageNum, setPageNum] = useState(2);
	const [totalPages, setTotalPages] = useState(1);
	const [totalItems, setTotalItems] = useState(0);
	const [itemsToCompare, setItemsToCompare] = useState<number[]>([]);

	const voivodeship = searchParams ? searchParams.get('voivodeship') || undefined : undefined;
	const city = searchParams ? searchParams.get('city') || undefined : undefined;

	useEffect(() => {
		if (voivodeship) {
			const params = new URLSearchParams(searchParams?.toString());
			params.set('voivodeship', voivodeship);
			router.push(`${window.location.pathname}?${params.toString()}`);
		}

		if (city) {
			const params = new URLSearchParams(searchParams?.toString());
			params.set('city', city);
			router.push(`${window.location.pathname}?${params.toString()}`);
		}
	}, [voivodeship, city, router, searchParams]);

	const fetchInstitutions = useCallback(async () => {
		if (loading || pageNum > totalPages) return;

		setLoading(true);
		const data = await getInstitutions(searchParams as URLSearchParams, pageNum);
		setInstitutions((prevInstitutions) => [...prevInstitutions, ...data.items]);
		setPageNum((prevPageNum) => prevPageNum + 1);
		setLoading(false);
	}, [pageNum, loading, totalPages, searchParams]);

	const institutionItems = useMemo(() => institutions.map((institution, index) => (
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
				isAvailable={institution.isAvailable}
				rating={institution.rating} />
		</Box>
	)), [institutions]);

	useEffect(() => {
		const getData = async () => {
			setLoading(true);
			try {
				const data = await getInstitutions(searchParams as URLSearchParams);
				setInstitutions(data.items);
				setTotalItems(data.totalItems);
				setTotalPages(data.totalPages);
			} catch (error) {
				console.error(error);
			}
			setLoading(false);
		};

		getData();
	}, [searchParams]);

	useEffect(() => {
		const itemsToCompare = JSON.parse(localStorage.getItem('itemsToCompare') || '[]') as number[];
		setItemsToCompare(itemsToCompare);

		// Optional: Listen for storage changes from other components
		const handleStorageChange = () => {
			const items = JSON.parse(localStorage.getItem('itemsToCompare') || '[]') as number[];
			setItemsToCompare(items);
		};

		window.addEventListener('storage', handleStorageChange);
		return () => window.removeEventListener('storage', handleStorageChange);
	}, []); // Empty dependency array means this only runs once on mount

	const handleChange = (event: SelectChangeEvent<string>, _child: ReactNode) => {
		const params = new URLSearchParams(searchParams?.toString());
		params.set('sort', event.target.value);
		router.push(`${window.location.pathname}?${params.toString()}`);
	};

	const clearComparison = () => {
		localStorage.removeItem('itemsToCompare');
		setItemsToCompare([]);
		// Dispatch storage event after state is cleared
		window.dispatchEvent(new Event('storage'));
	};

	return (
		<Box>
			<Box display={{ xs: 'flex', md: 'none' }} pt={3} pb={3} justifyContent='center' sx={{ backgroundImage: `url(${"/images/map-mobile-background.png"})` }}>
				<Button component={Link} href={generatePath(PathConstants.MAP)} variant='contained' color='success'>
					Zobacz na mapie
				</Button>
			</Box>
			<Box>
				<Paper elevation={0}>
					<Stack direction={{ xs: 'column', sm: 'row', md: 'column', lg: 'row' }} spacing={1} justifyContent='space-between' alignItems='center'>
						<Box display='flex' justifyContent='space-around' alignItems='center'>
							<Button variant='contained' color='success' disabled={itemsToCompare.length < 1 || itemsToCompare.length > 5} href={`${PathConstants.COMPARISON}?ids=${itemsToCompare.join(',')}`}>
								Porównanie ({itemsToCompare.length}/5)
							</Button>
							{itemsToCompare.length > 0 && (
								<Button variant='contained' color='error' aria-label="Wyczyść porównanie" sx={{ marginLeft: '0.5rem' }} onClick={() => clearComparison()}>
									<Clear /> Wyczyść
								</Button>
							)}
						</Box>

						{institutions && institutions.length > 0 && (
							<Typography variant='body2' color="text.secondary" gutterBottom>
								Znaleziono {totalItems} placówek
							</Typography>
						)}

						<FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
							<InputLabel id="sorting-select-label">Sortowanie</InputLabel>
							<Select
								labelId="sorting-select-label"
								id="sorting-select"
								value={searchParams?.get('sort') || 'name-asc'}
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
				</Paper>
			</Box>
			<List component="ul" style={{ overflowY: 'auto', height: '72vh' }}>
				<InfiniteScroll
					pageStart={0}
					loadMore={fetchInstitutions}
					hasMore={pageNum <= totalPages}
					useWindow={false}
					loader={
						<Stack spacing={2} direction={'column'} p={2} key={0}>
							<Skeleton variant="rectangular" width='100%' height={150} />
							<Skeleton variant="rectangular" width='100%' height={150} />
							<Skeleton variant="rectangular" width='100%' height={150} />
							<Skeleton variant="rectangular" width='100%' height={150} />
						</Stack>
					}
				>
					{institutions && institutions.length > 0 && institutionItems}
				</InfiniteScroll>
			</List>
		</Box >
	);
}
