import { Helmet } from "react-helmet-async";

interface MetadataProps {
    title: string;
    description?: string;
    image: string;
    url?: string;
}

export default function Metadata({ title, description, image, url }: MetadataProps) {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
            <meta name="twitter:card" content="summary_large_image" />
        </Helmet>
    )
};
