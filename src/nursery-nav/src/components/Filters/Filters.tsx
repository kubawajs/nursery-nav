import { Autocomplete, Box, Checkbox, FormControlLabel, FormGroup, Stack, TextField } from "@mui/material";
import { useContext } from "react";
import { InstitutionContext } from "../../App";
import RangeSlider from "./RangeSlider";

export default function Filters() {
    const { institutions } = useContext(InstitutionContext);
    return (
        <Box>
            <Stack
                spacing={2}
                direction={{ xs: 'column', md: 'row' }}
                p={1}
                sx={{ bgcolor: 'primary.light' }}
            >
                <Autocomplete
                    disablePortal
                    options={institutions.map(institution => institution.name)}
                    renderInput={(params) => <TextField {...params} label="Nazwa żłobka" />}
                    size="small"
                    sx={{ width: 400 }}
                />
                <Autocomplete
                    options={institutions.map(institution => institution.address.city)}
                    renderInput={(params) => <TextField {...params} label="Miasto" />}
                    size="small"
                    sx={{ width: 300 }}
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
    );
}