export default function ListItem() {
    return (
        <li className="flex items-center gap-4">
            <img src="https://picsum.photos/150" alt="Placeholder" className="w-24 h-24 object-cover rounded-lg" />
            <div>
                <h2 className="text-lg font-semibold text-gray-800">Żłobek "Bajkowy Świat"</h2>
                <p className="text-gray-600">ul. Przykładowa 123, 00-000 Warszawa</p>
                <p className="text-gray-600">Cena: 1000 PLN / miesiąc</p>
            </div>
        </li>
    );
}