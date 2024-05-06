import { FormGroup, FormControlLabel, Checkbox, Autocomplete, TextField, debounce } from "@mui/material";
import RangeSlider from "./RangeSlider";
import { useContext, useEffect, useState } from "react";
import { InstitutionContext } from "../Layout/Layout";
import { InstitutionAutocomplete, InstitutionType } from "../../shared/nursery.interface";

export default function Filters() {
    const { setFiltersQuery } = useContext(InstitutionContext);

    const [cityFilter, setCityFilter] = useState<string | null>(null);
    const [voivodeshipFilter, setVoivodeshipFilter] = useState<string | null>(null);
    const [nurseryFilter, setNurseryFilter] = useState<boolean>(true);
    const [childClubFilter, setChildClubFilter] = useState<boolean>(true);
    const [priceFilter, setPriceFilter] = useState<number[]>([0, 5000]);
    const [institutionsAutocomplete, setInstitutionsAutocomplete] = useState<InstitutionAutocomplete[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [voivodeships, setVoivodeships] = useState<string[]>([]);

    useEffect(() => {
        const buildFiltersQuery = () => {
            let query = '';
            if (cityFilter) {
                query += `city=${encodeURIComponent(cityFilter)}&`;
            }
            if (voivodeshipFilter) {
                query += `voivodeship=${encodeURIComponent(voivodeshipFilter)}&`;
            }
            if (nurseryFilter) {
                query += `insType=${InstitutionType.NURSERY}&`;
            }
            if (childClubFilter) {
                query += `insType=${InstitutionType.CHILDCLUB}&`;
            }
            if (priceFilter) {
                query += `${priceFilter[0] ? `priceMin=${priceFilter[0]}` : ''}&${priceFilter[1] ? `priceMax=${priceFilter[1]}` : ''}`;
            }
            return query;
        }

        const query = buildFiltersQuery();
        setFiltersQuery(query);
    }, [cityFilter, voivodeshipFilter, nurseryFilter, childClubFilter, priceFilter, setFiltersQuery]);

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
    }, [setCities]);

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

    return (
        <>
            <Autocomplete
                disablePortal
                onChange={(_event, value) => window.location.href = `/institutions/details/${value?.id || ''}`}
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
                onChange={(_event, value) => setCityFilter(value)}
                renderInput={(params) => <TextField {...params} label="Miasto" />}
                size="small"
                sx={{ width: 300, maxWidth: '100%' }}
            />
            <Autocomplete
                id="voivodeshipFilter"
                options={voivodeships || []}
                onChange={(_event, value) => setVoivodeshipFilter(value)}
                renderInput={(params) => <TextField {...params} label="Województwo" />}
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

