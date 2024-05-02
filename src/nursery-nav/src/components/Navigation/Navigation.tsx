import { AppBar, Container, Toolbar, Link, Typography } from '@mui/material';
import { FamilyRestroom } from '@mui/icons-material';

export default function Navigation() {
	return (
		<AppBar position="sticky">
			<Container maxWidth="xl">
				<Toolbar>
					<Link href="/" underline="none" color="inherit" display='flex' sx={{ flexGrow: 1 }}>
						<FamilyRestroom sx={{ display: 'flex', mr: 1 }} />
						<Typography
							variant="h5"
							noWrap
							sx={{
								mr: 2,
								display: 'flex',
								fontFamily: 'monospace',
								fontWeight: 700,
								letterSpacing: '.2rem',
								textDecoration: 'none'
							}}
						>
							{process.env.REACT_APP_NAME}
						</Typography>
					</Link>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
