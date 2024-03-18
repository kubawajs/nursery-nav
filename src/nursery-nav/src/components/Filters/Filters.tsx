import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Box, Checkbox, FormControlLabel, FormGroup, Stack, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import { InstitutionContext } from "../../App";
import RangeSlider from "./RangeSlider";

export default function Filters() {
    const { institutions } = useContext(InstitutionContext);
    return (
        <Box>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <Stack
                    spacing={2}
                    direction={{ xs: 'column', md: 'row' }}
                    p={1}
                    sx={{
                        bgcolor: 'primary.light',
                        borderBottomLeftRadius: 8,
                        borderBottomRightRadius: 8,
                        alignItems: 'center'
                    }}
                >
                    <Autocomplete
                        disablePortal
                        options={institutions.map(institution => institution.name)}
                        renderInput={(params) => <TextField {...params} label="Nazwa żłobka" />}
                        size="small"
                        sx={{ width: 400, maxWidth: '100%' }}
                    />
                    <Autocomplete
                        options={institutions.map(institution => institution.address.city)}
                        renderInput={(params) => <TextField {...params} label="Miasto" />}
                        size="small"
                        sx={{ width: 300, maxWidth: '100%' }}
                    />
                    <FormGroup sx={{ display: 'flex', flexDirection: 'row' }}>
                        <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label="Żłobek"
                        />
                        <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label="Klub dziecięcy"
                        />
                    </FormGroup>
                    <RangeSlider />
                </Stack>
            </Box >
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <Accordion sx={{
                    display: { xs: 'block', md: 'none' }, bgcolor: 'primary.light',
                    borderBottomLeftRadius: 8,
                    borderBottomRightRadius: 8,
                }}>
                    <AccordionSummary>
                        <Typography variant='h5'>
                            Filtruj
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Stack
                            spacing={2}
                            direction={{ xs: 'column', md: 'row' }}
                            p={1}
                        >
                            <Autocomplete
                                disablePortal
                                options={institutions.map(institution => institution.name)}
                                renderInput={(params) => <TextField {...params} label="Nazwa żłobka" />}
                                size="small"
                                sx={{ width: 400, maxWidth: '100%' }}
                            />
                            <Autocomplete
                                options={institutions.map(institution => institution.address.city)}
                                renderInput={(params) => <TextField {...params} label="Miasto" />}
                                size="small"
                                sx={{ width: 300, maxWidth: '100%' }}
                            />
                            <FormGroup sx={{ display: 'flex', flexDirection: 'row' }}>
                                <FormControlLabel
                                    control={<Checkbox defaultChecked />}
                                    label="Żłobek"
                                />
                                <FormControlLabel
                                    control={<Checkbox defaultChecked />}
                                    label="Klub dziecięcy"
                                />
                            </FormGroup>
                            <RangeSlider />
                        </Stack>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </Box>
    );
}