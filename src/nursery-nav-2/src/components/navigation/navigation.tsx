export default function Navigation() {
    return (
        <nav className="flex items-center justify-between p-4 bg-white shadow-md">
            <div className="flex items-center gap-4">
                <a href="/" className="text-lg font-semibold text-gray-800">ZnajdzZlobek.pl</a>
            </div>
            <div className="hidden md:flex items-center gap-4">
                <ul className="ml-auto flex items-center gap-4">
                    <li>
                        <a href="/about" className="text-gray-800 hover:text-blue-500">O nas</a>
                    </li>
                    <li>
                        <a href="/contact" className="text-gray-800 hover:text-blue-500">Kontakt</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}