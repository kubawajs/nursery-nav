import { FormControlLabel, Autocomplete, TextField, debounce, RadioGroup, Stack } from "@mui/material";
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useState } from "react";
import { InstitutionAutocomplete, InstitutionType } from "../../shared/nursery.interface";
import { generatePath, useNavigate, useSearchParams } from "react-router-dom";
import PathConstants from "../../shared/pathConstants";
import { getInstitutionAutocomplete } from "../../api/InstitutionsFetcher";
import { getCitiesResponse } from "../../api/CitiesFetcher";

interface FiltersProps {
    defaultVoivodeship?: string;
    defaultCity?: string;
    isMobile?: boolean;
    citiesResponse?: getCitiesResponse[];
}

export default function Filters({ defaultVoivodeship, defaultCity, isMobile, citiesResponse }: FiltersProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const [institutionsAutocomplete, setInstitutionsAutocomplete] = useState<InstitutionAutocomplete[]>([]);
    const voivodeships = [
        'DOLNOŚLĄSKIE',
        'KUJAWSKO-POMORSKIE',
        'LUBELSKIE',
        'LUBUSKIE',
        'ŁÓDZKIE',
        'MAŁOPOLSKIE',
        'MAZOWIECKIE',
        'OPOLSKIE',
        'PODKARPACKIE',
        'PODLASKIE',
        'POMORSKIE',
        'ŚLĄSKIE',
        'ŚWIĘTOKRZYSKIE',
        'WARMIŃSKO-MAZURSKIE',
        'WIELKOPOLSKIE',
        'ZACHODNIOPOMORSKIE',
    ];


    const citiesUnique = (citiesResponse || [])
        .map(city => ({ city: city?.city, voivodeship: city?.voivodeship }))
        .filter((city, index, self) => self.findIndex(c => c.city === city.city) === index);
    const cities = citiesUnique.filter(city => city !== undefined && city !== null);

    const getAutocompleteData = async (value: string) => {
        const institutions = await getInstitutionAutocomplete(value);
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
        <Stack
            spacing={2}
            direction={isMobile ? 'column' : 'row'}
            p={1}
            sx={{ alignItems: 'center' }}
        >
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
            {!defaultCity &&
                <Autocomplete
                    id="cityFilter"
                    options={cities.filter(city =>
                        (defaultVoivodeship && city.voivodeship === defaultVoivodeship) ||
                        (!defaultVoivodeship && (!searchParams.get('voivodeship') || city.voivodeship === searchParams.get('voivodeship'))))?.map(city => city.city) || []}
                    value={searchParams.get('city') || null}
                    onChange={(_event, value) => {
                        if (!value && searchParams.has('city')) {
                            searchParams.delete('city');
                        }
                        else if (value) {
                            searchParams.set('city', value);
                            searchParams.set('voivodeship', cities.find(city => city.city === value)?.voivodeship || '');
                        }
                        setSearchParams(searchParams);
                    }}
                    renderInput={(params) => <TextField {...params} label="Miasto" />}
                    size="small"
                    sx={{ width: 300, maxWidth: '100%' }}
                />
            }

            {!defaultVoivodeship &&
                <Autocomplete
                    id="voivodeshipFilter"
                    options={voivodeships || []}
                    value={searchParams.get('voivodeship') || null}
                    onChange={(_event, value) => {
                        if (!value && searchParams.has('voivodeship')) {
                            searchParams.delete('voivodeship');
                        }
                        else if (value) {
                            searchParams.set('voivodeship', value);
                        }
                        setSearchParams(searchParams);
                    }}
                    renderInput={(params) => <TextField {...params} label="Województwo" />}
                    size="small"
                    sx={{ width: 300, maxWidth: '100%' }}
                />
            }

            <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Typ placówki</FormLabel>
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
            {/* <RangeSlider handleChangeCommited={(_event, value) => {
                value[0] && searchParams.set('priceMin', value[0].toString());
                value[1] && searchParams.set('priceMax', value[1].toString());
                setSearchParams(searchParams);
            }} /> */}
        </Stack>
    );
}

