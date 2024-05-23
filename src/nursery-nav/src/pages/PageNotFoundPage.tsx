import { Container, Link, Stack, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import PathConstants from "../shared/pathConstants";

export default function PageNotFoundPage() {
    const title = `Strona nie istnieje`;
    const image = `${process.env.REACT_APP_API_URL}/images/favicon.ico`;

    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta property="og:image" content={image} />
                <meta property="og:title" content={title} />
            </Helmet>
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