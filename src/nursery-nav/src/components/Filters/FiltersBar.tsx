import { Accordion, AccordionDetails, AccordionSummary, Box, Stack, Typography } from "@mui/material";
import Filters from "./Filters";
import { FilterList } from "@mui/icons-material";

export default function FiltersBar() {
    return (
        <Box>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <Stack
                    spacing={2}
                    direction={{ xs: 'column', md: 'row' }}
                    p={1}
                    sx={{
                        bgcolor: 'primary.light',
                        borderBottomLeftRadius: 8,
                        borderBottomRightRadius: 8,
                        alignItems: 'center'
                    }}
                >
                    <Filters />
                </Stack>
            </Box >
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <Accordion sx={{
                    display: 'block',
                    borderBottomLeftRadius: 8,
                    borderBottomRightRadius: 8,
                    p: 0
                }}>
                    <AccordionSummary sx={{ bgcolor: 'primary.light' }}>
                        <FilterList />
                        <Typography variant='h5'>
                            Filtruj
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Stack
                            spacing={2}
                            direction={{ xs: 'column', md: 'row' }}
                            p={1}
                        >
                            <Filters />
                        </Stack>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </Box>
    );
}