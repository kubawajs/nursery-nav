import { Box, InputLabel, Slider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function valuetext(value: number) {
    return `${value} PLN / miesiąc`;
}

export default function RangeSlider({ handleChangeCommited }: { handleChangeCommited: (event: Event, value: number[]) => void }) {
    const [searchParams] = useSearchParams();
    const [value, setValue] = useState<number[]>([0, 5000]);
    const handleChange = (_event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    useEffect(() => {
        const priceMin = searchParams.get('priceMin');
        const priceMax = searchParams.get('priceMax');
        if (priceMin && priceMax) {
            setValue([parseInt(priceMin), parseInt(priceMax)]);
        }
    }, [searchParams]);

    return (
        <Box sx={{ width: 300 }}>
            <InputLabel id="range-slider-label">Cena za miesiąc</InputLabel>
            <Box display='flex'>
                <Typography variant="caption" gutterBottom>{value[0]} PLN</Typography>
                <Slider
                    getAriaLabel={() => 'Cena za miesiąc'}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    max={5000}
                    aria-labelledby="range-slider-label"
                    sx={{ maxWidth: '90%', marginLeft: '10px', marginRight: '12px' }}
                    onChangeCommitted={(_event, value) => handleChangeCommited(_event as Event, value as number[])}
                />
                <Typography variant="caption" gutterBottom>{value[1]} PLN</Typography>
            </Box>
        </Box>
    );
}
