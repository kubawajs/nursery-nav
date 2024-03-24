import { Autocomplete, TextField, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import RangeSlider from "./RangeSlider";
import { useContext, useEffect, useState } from "react";
import { InstitutionContext } from "../../App";

export default function Filters() {
    const { institutions, setFilteredInstitutions, setSelectedInstitution } = useContext(InstitutionContext);
    const [cityFilter, setCityFilter] = useState<string | null>(null);
    const [nurseryFilter, setNurseryFilter] = useState<boolean>(true);
    const [childClubFilter, setChildClubFilter] = useState<boolean>(true);

    function setCurrentSelection(event: any, value: any) {
        const currentSelection = institutions.find(institution => institution.name === value);
        if (currentSelection) {
            setSelectedInstitution(currentSelection);
        }
    }

    useEffect(() => {
        setFilteredInstitutions(institutions.filter(institution =>
            (!cityFilter || institution.address.city === cityFilter) &&
            (nurseryFilter && institution.institutionType === 'Żłobek' || childClubFilter && institution.institutionType === 'Klub dziecięcy')
        ));
    }, [cityFilter, nurseryFilter, childClubFilter]);

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
                id="cityFilter"
                options={institutions.map(institution => institution.address.city).filter((value, index, self) => self.indexOf(value) === index)}
                onChange={(_event, value) => setCityFilter(value)}
                renderInput={(params) => <TextField {...params} label="Miasto" />}
                size="small"
                sx={{ width: 300, maxWidth: '100%' }}
            />
            <FormGroup sx={{ display: 'flex', flexDirection: 'row' }} >
                <FormControlLabel
                    control={<Checkbox defaultChecked onChange={(_event, value) => setNurseryFilter(value)} />}
                    label="Żłobek"
                />
                <FormControlLabel
                    control={<Checkbox defaultChecked onChange={(_event, value) => setChildClubFilter(value)} />}
                    label="Klub dziecięcy"
                />
            </FormGroup>
            <RangeSlider />
        </>
    );
}

