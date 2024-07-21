import { Button, Link, Stack } from "@mui/material";
import { generatePath } from "react-router-dom";
import PathConstants from "../../shared/pathConstants";

export default function CityQuickFilters() {
    const majorCities = [
        ['POZNAŃ', 'WIELKOPOLSKIE'],
        ['WROCŁAW', 'DOLNOŚLĄSKIE'],
        ['GDAŃSK', 'POMORSKIE'],
        ['KRAKÓW', 'MAŁOPOLSKIE'],
        ['WARSZAWA', 'MAZOWIECKIE'],
        ['ŁÓDŹ', 'ŁÓDZKIE'],
    ]

    return (
        <Stack
            spacing={2}
            pb={1}
            margin={2}
            direction={'row'}
            flexWrap='wrap'
            useFlexGap
            justifyContent='center'>
            {
                majorCities.map(city => {
                    const cityName = city[0];
                    const voivodeship = city[1];
                    return (
                        <Button
                            component={Link}
                            key={cityName}
                            href={generatePath(PathConstants.INSTITUTION_BY_CITY, { voivodeship, city: cityName })}
                            variant="contained"
                            color="secondary"
                        >
                            {cityName}
                        </Button>
                    );
                })
            }
        </Stack >
    )
}