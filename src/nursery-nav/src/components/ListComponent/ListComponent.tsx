import { Box, Button, Card, CardActions, CardContent, Container, Divider, List, ListItem, ListItemText, Typography } from "@mui/material";
import React from "react";

export default function ListComponent() {
    const card = (
        <React.Fragment>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Poznań
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Żłobek "Bajkowy"
                </Typography>
                <Typography variant="body2">
                    well meaning and kindly.
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </React.Fragment>
    );

    return (
        <Box component="section">
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Found xxx results
            </Typography>
            <List>
                <ListItem sx={{ display: 'block' }}>
                    <Card variant="outlined">
                        {card}
                    </Card>
                </ListItem>
                <ListItem sx={{ display: 'block' }}>
                    <Card variant="outlined">
                        {card}
                    </Card>
                </ListItem>
                <ListItem sx={{ display: 'block' }}>
                    <Card variant="outlined">
                        {card}
                    </Card>
                </ListItem>
            </List>
        </Box>
    );
}