import { AppBar, Container, Toolbar, Link, Typography, Box } from '@mui/material';
import { FamilyRestroom } from '@mui/icons-material';

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
								{process.env.REACT_APP_NAME}
							</Typography>
						</Link>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
