import { Autocomplete, TextField, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import RangeSlider from "./RangeSlider";
import { useContext, useEffect } from "react";
import { InstitutionContext } from "../../App";

export default function Filters() {
    const { institutions, setSelectedInstitution } = useContext(InstitutionContext);

    function setCurrentSelection(event: any, value: any) {
        const currentSelection = institutions.find(institution => institution.name === value);
        if (currentSelection) {
            setSelectedInstitution(currentSelection);
        }
    }

    return (
        <>
            <Autocomplete
                disablePortal
                onChange={setCurrentSelection}
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
        </>
    );
}

