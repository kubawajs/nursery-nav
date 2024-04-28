import { FormGroup, FormControlLabel, Checkbox, Autocomplete, TextField } from "@mui/material";
import RangeSlider from "./RangeSlider";
import { useEffect, useState } from "react";

export default function Filters() {
    const [cityFilter, setCityFilter] = useState<string | null>(null);
    const [voivodeshipFilter, setVoivodeshipFilter] = useState<string | null>(null);
    const [nurseryFilter, setNurseryFilter] = useState<boolean>(true);
    const [childClubFilter, setChildClubFilter] = useState<boolean>(true);
    const [priceFilter, setPriceFilter] = useState<number[]>([0, 5000]);
    const [cities, setCities] = useState<string[]>([]);
    const [voivodeships, setVoivodeships] = useState<string[]>([]);

    useEffect(() => {
        const fetchCities = async () => {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/cities`);
            const cities = await response.json() as { city: string, voivodeship: string }[];
            setCities(cities.map(city => city.city));

            const voivodeshipsUnique = cities.map(city => city.voivodeship)
                .filter((voivodeship, index, self) => self.indexOf(voivodeship) === index)
                .sort((a, b) => a.localeCompare(b));
            setVoivodeships(voivodeshipsUnique);
        };
        fetchCities();
    }, [cities, setCities]);

    // const setCurrentSelection = useCallback((_event: SyntheticEvent<Element, Event>, value: string | null) => {
    //     const currentSelection = institutions.find(institution => institution.name === value);
    //     if (currentSelection) {
    //         queryParam.set('regNo', currentSelection.operatingEntity.regNoPosition);
    //         setQueryParam(queryParam);
    //         setSelectedInstitution(currentSelection);
    //     }
    // }, [institutions, queryParam, setQueryParam, setSelectedInstitution]);

    return (
        <>
            {/* <Autocomplete
                disablePortal
                onChange={setCurrentSelection}
                options={institutionsAutocomplete}
                renderInput={(params) => <TextField {...params} label="Nazwa żłobka" />}
                size="small"
                sx={{ width: 400, maxWidth: '100%' }}
    />*/}
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

