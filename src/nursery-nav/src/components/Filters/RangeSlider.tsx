import { Box, InputLabel, Slider } from "@mui/material";
import { useState } from "react";

function valuetext(value: number) {
    return `${value} PLN / miesiąc`;
}

export default function RangeSlider() {
    const [value, setValue] = useState<number[]>([0, 3000]);
    const handleChange = (_event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    return (
        <Box sx={{ width: 300 }}>
            <InputLabel id="range-slider-label">Cena za miesiąc</InputLabel>
            <Slider
                getAriaLabel={() => 'Cena za miesiąc'}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                max={3000}
                aria-labelledby="range-slider-label"
            />
        </Box>
    );
}
