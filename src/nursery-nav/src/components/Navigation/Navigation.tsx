import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { FamilyRestroom } from '@mui/icons-material';

export default function Navigation() {
	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar>
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
				</Toolbar>
			</Container>
		</AppBar>
	);
}
