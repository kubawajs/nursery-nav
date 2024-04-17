import { Autocomplete, TextField, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import RangeSlider from "./RangeSlider";
import { SyntheticEvent, useCallback, useContext, useEffect, useState } from "react";
import { InstitutionContext } from "../../App";
import { useSearchParams } from "react-router-dom";
import { InstitutionType } from "../../shared/nursery.interface";

export default function Filters() {
    const { institutions, setFilteredInstitutions, setSelectedInstitution } = useContext(InstitutionContext);
    const [cityFilter, setCityFilter] = useState<string | null>(null);
    const [nurseryFilter, setNurseryFilter] = useState<boolean>(true);
    const [childClubFilter, setChildClubFilter] = useState<boolean>(true);
    const [priceFilter, setPriceFilter] = useState<number[]>([0, 5000]);
    const [queryParam, setQueryParam] = useSearchParams();
    const cities = institutions.map(institution => institution.address.city).filter((value, index, self) => self.indexOf(value) === index).sort();
    const institutionsAutocomplete = institutions.map(institution => institution.name).filter((value, index, self) => self.indexOf(value) === index).sort();

    useEffect(() => {
        setFilteredInstitutions(institutions.filter(institution =>
            (!cityFilter || institution.address.city === cityFilter) &&
            ((nurseryFilter && institution.institutionType === InstitutionType.NURSERY) || (childClubFilter && institution.institutionType === InstitutionType.CHILDCLUB)) &&
            institution.basicPricePerMonth >= priceFilter[0] && institution.basicPricePerMonth <= priceFilter[1]
        ));
    }, [cityFilter, nurseryFilter, childClubFilter, priceFilter, institutions, setFilteredInstitutions]);

    const setCurrentSelection = useCallback((_event: SyntheticEvent<Element, Event>, value: string | null) => {
        const currentSelection = institutions.find(institution => institution.name === value);
        if (currentSelection) {
            queryParam.set('regNo', currentSelection.operatingEntity.regNoPosition);
            setQueryParam(queryParam);
            setSelectedInstitution(currentSelection);
        }
    }, [institutions, queryParam, setQueryParam, setSelectedInstitution]);

    return (
        <>
            <Autocomplete
                disablePortal
                onChange={setCurrentSelection}
                options={institutionsAutocomplete}
                renderInput={(params) => <TextField {...params} label="Nazwa żłobka" />}
                size="small"
                sx={{ width: 400, maxWidth: '100%' }}
            />
            <Autocomplete
                id="cityFilter"
                options={cities}
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
            <RangeSlider handleChangeCommited={(_event, value) => setPriceFilter(value)} />
        </>
    );
}

