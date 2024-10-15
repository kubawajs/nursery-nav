import { Container, Link, Stack, Typography } from "@mui/material";

import PathConstants from "../shared/pathConstants";
import Metadata from "../components/Metadata/Metadata";

export default function PageNotFoundPage() {
    const title = `Strona nie istnieje`;
    const image = `${import.meta.env.VITE_APP_API_URL}/images/favicon.ico`;

    return (
        <>
            <Metadata title={title} image={image} />
            <Container fixed>
                <Stack direction="column" justifyContent="center" alignItems="center" height="80vh">
                    <Typography variant="h1">Strona nie istnieje</Typography>
                    <Typography variant="body1">
                        Przepraszamy, ale strona, której szukasz, nie istnieje. Sprawdź, czy adres URL jest poprawny.
                    </Typography>
                    <Typography variant="body1">
                        Wróć do <Link href={PathConstants.HOME}>strony głównej</Link>.
                    </Typography>
                </Stack>
            </Container>
        </>
    );
}
