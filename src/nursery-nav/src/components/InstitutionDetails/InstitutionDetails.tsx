import {
	Box,
	Chip,
	Grid,
	Paper,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography
} from '@mui/material';
import { Institution } from '../../shared/nursery.interface';
import {
	PhoneAndroid,
	AlternateEmail,
	Language,
	FoodBankOutlined,
	CottageOutlined
} from '@mui/icons-material';

export default function InstitutionDetails(institution: Institution) {
	return (
		<Box>
			<Box>
				<Paper elevation={3}>
					<Chip label={institution.institutionType} />
					<Typography variant="h2">{institution.name}</Typography>
					<Box>
						<TableContainer>
							<TableBody>
								<TableHead>
									<TableRow>
										<TableCell colSpan={2}>
											<CottageOutlined />
										</TableCell>
										<TableCell colSpan={2}>
											<FoodBankOutlined />
										</TableCell>
									</TableRow>
								</TableHead>
								<TableRow>
									<TableCell>
										{institution.basicPricePerMonth && (
											<>{institution.basicPricePerMonth.toFixed(2)} PLN / miesiąc</>
										)}
									</TableCell>
									<TableCell>
										{institution.basicPricePerHour && (
											<>{institution.basicPricePerHour.toFixed(2)} PLN / godzina</>
										)}
									</TableCell>
									<TableCell>
										{institution.foodPricePerMonth && (
											<>{institution.foodPricePerMonth.toFixed(2)} PLN miesiąc</>
										)}
									</TableCell>
									<TableCell>
										{institution.foodPricePerDay && (
											<>{institution.foodPricePerDay.toFixed(2)} PLN / dzień</>
										)}
									</TableCell>
								</TableRow>
							</TableBody>
						</TableContainer>
					</Box>
				</Paper>
			</Box>
			<Box>
				<Paper elevation={1}>
					<Typography variant="subtitle1">Opis</Typography>
					<Box>
						<Typography variant="body1">{institution.address.fullAddress}</Typography>
					</Box>
					<Typography variant="subtitle2">Godziny otwarcia</Typography>
					<Box>
						<Typography variant="body1">{institution.openingHours}</Typography>
					</Box>
					<Typography variant="subtitle2">Zniżki</Typography>
					{institution.discounts &&
						institution.discounts.map((discount, index) => <Chip key={index} label={discount} />)}
				</Paper>
			</Box>
			<Box>
				<Paper elevation={3}>
					<Grid container>
						<Grid item xs={12}>
							<Box>
								<Typography variant="overline">
									<PhoneAndroid />
									<br />
									{institution.phone}
								</Typography>
							</Box>
						</Grid>
						<Grid item xs={12}>
							<Box>
								<Typography variant="overline">
									<AlternateEmail />
									<br />
									{institution.email}
								</Typography>
							</Box>
						</Grid>
						<Grid item xs={12}>
							<Box>
								<Typography variant="overline">
									<Language />
									<br />
									{institution.website}
								</Typography>
							</Box>
						</Grid>
					</Grid>
				</Paper>
			</Box>
		</Box>
	);
}
