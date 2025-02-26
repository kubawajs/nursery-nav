import { useRouter } from "next/router";

export default function Institutions() {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div className="grid grid-cols-2 gap-4 w-full h-full">
            <h1 className="text-2xl font-semibold text-gray-800">Żłobek {id}</h1>
        </div>
    );
}