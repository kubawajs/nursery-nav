import { FormControlLabel, Autocomplete, TextField, debounce, RadioGroup } from "@mui/material";
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RangeSlider from "./RangeSlider";
import { useEffect, useState } from "react";
import { InstitutionAutocomplete, InstitutionType } from "../../shared/nursery.interface";
import { generatePath, useNavigate, useSearchParams } from "react-router-dom";
import PathConstants from "../../shared/pathConstants";

export default function Filters() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const [institutionsAutocomplete, setInstitutionsAutocomplete] = useState<InstitutionAutocomplete[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [voivodeships, setVoivodeships] = useState<string[]>([]);

    useEffect(() => {
        const fetchCities = async () => {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/cities`);
            const citiesResponse = await response.json() as { city: string, voivodeship: string }[];
            const citiesUnique = citiesResponse.map(city => city.city)
                .filter((city, index, self) => self.indexOf(city) === index);
            setCities(citiesUnique);

            const voivodeshipsUnique = citiesResponse.map(city => city.voivodeship)
                .filter((voivodeship, index, self) => self.indexOf(voivodeship) === index)
                .sort((a, b) => a.localeCompare(b));
            setVoivodeships(voivodeshipsUnique);
        };

        fetchCities();
    }, []);

    const getAutocompleteData = async (value: string) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/institutions/autocomplete?search=${value}`);
        const institutions = await response.json() as { name: string, id: number }[];
        setInstitutionsAutocomplete(institutions.map(institution => ({ name: institution.name, id: institution.id })));
    }

    const onInputChange = (_event: any, value: string | null) => {
        if (value) {
            getAutocompleteData(value);
        }
        else {
            setInstitutionsAutocomplete([]);
        }
    }

    const goToDetails = (_event: any, value: InstitutionAutocomplete | null) => {
        if (value) {
            navigate(generatePath(PathConstants.INSTITUTION_DETAILS, { id: value.id }));
        }
    }

    const handleInstitutionTypeFilter = (value: string) => {
        if (value === 'ALL') {
            searchParams.delete('insType');
        }
        else {
            searchParams.set('insType', value);
        }
        setSearchParams(searchParams);
    }

    return (
        <>
            <Autocomplete
                disablePortal
                onChange={goToDetails}
                onInputChange={debounce(onInputChange, 250)}
                options={institutionsAutocomplete}
                getOptionKey={(option) => option.id}
                getOptionLabel={(option) => option.name}
                noOptionsText="Wpisz nazwę żłobka lub klubu dziecięcego"
                renderInput={(params) => <TextField {...params} label="Nazwa żłobka" />}
                size="small"
                sx={{ width: 400, maxWidth: '100%' }}
            />
            <Autocomplete
                id="cityFilter"
                options={cities}
                onChange={(_event, value) => {
                    if (!value && searchParams.has('city')) {
                        searchParams.delete('city');
                    }
                    else if (value) {
                        searchParams.set('city', value);
                    }
                    setSearchParams(searchParams);
                }}
                renderInput={(params) => <TextField {...params} label="Miasto" />}
                size="small"
                sx={{ width: 300, maxWidth: '100%' }}
            />
            <Autocomplete
                id="voivodeshipFilter"
                options={voivodeships || []}
                onChange={(_event, value) => {
                    if (!value && searchParams.has('voivodeship')) {
                        searchParams.delete('voivodeship');
                    }
                    else if (value) {
                        searchParams.set('voivodeship', value);
                    }
                    setSearchParams(searchParams);
                }}
                onReset={() => { console.log('reset') }}
                renderInput={(params) => <TextField {...params} label="Województwo" />}
                size="small"
                sx={{ width: 300, maxWidth: '100%' }}
            />
            <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Typ instytucji</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    defaultValue='ALL'
                    value={searchParams.get('insType') || 'ALL'}
                    onChange={(_event, value) => handleInstitutionTypeFilter(value)}>
                    <FormControlLabel value={InstitutionType.NURSERY} control={<Radio />} label="Żłobek" />
                    <FormControlLabel value={InstitutionType.CHILDCLUB} control={<Radio />} label="Klub dziecięcy" />
                    <FormControlLabel value="ALL" control={<Radio />} label="Wszystkie" />
                </RadioGroup>
            </FormControl>
            <RangeSlider handleChangeCommited={(_event, value) => {
                value[0] && searchParams.set('priceMin', value[0].toString());
                value[1] && searchParams.set('priceMax', value[1].toString());
                setSearchParams(searchParams);
            }} />
        </>
    );
}

