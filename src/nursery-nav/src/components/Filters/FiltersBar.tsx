import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Stack,
    Typography
} from "@mui/material";
import Filters from "./Filters";
import { Close, FilterList } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { InstitutionContext } from "../Layout/Layout";

export default function FiltersBar() {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const { institutionIds } = useContext(InstitutionContext);

    useEffect(() => {
        setIsExpanded(false);
    }, [institutionIds]);

    return (
        <Box boxShadow={3}>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <Stack
                    spacing={2}
                    direction={'row'}
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
                <Accordion
                    expanded={isExpanded}
                    onChange={() => setIsExpanded(!isExpanded)}
                    sx={{
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
                            direction={'column'}
                            p={1}>
                            <Filters />
                            <Button onClick={() => setIsExpanded(false)}>Zamknij<Close /></Button>
                        </Stack>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </Box>
    );
}