import { AppBar, Container, Toolbar, Link, Typography, Box } from '@mui/material';
import { FamilyRestroom } from '@mui/icons-material';
import CityQuickFilters from '../Filters/CityQuickFilter';

export default function Navigation() {
	return (
		<AppBar position="sticky">
			<Container maxWidth="xl">
				<Toolbar>
					<Box>
						<Link href="/" underline="none" color="inherit" display='flex' sx={{ flexGrow: 1 }}>
							<FamilyRestroom sx={{ display: 'flex', mr: 1 }} />
							<Typography
								variant="h4"
								noWrap
								sx={{
									mr: 2,
									display: 'flex',
									fontWeight: 500,
									fontFamily: 'Mynerve, sans-serif',
									textDecoration: 'none'
								}}
							>
								{process.env.NEXT_PUBLIC_NAME}
							</Typography>
						</Link>
					</Box>
					<Box sx={{ display: { xs: 'none', sm: 'block' }, width: '100%' }}>
						<CityQuickFilters />
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
