import Link from "next/link"

export function Sidebar() {
    return (
        <div className="w-64 bg-gray-800 text-white p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <nav>
                <ul className="space-y-2">
                    <li>
                        <Link href="/dashboard" className="block py-2 px-4 hover:bg-gray-700 rounded">
                            Home
                        </Link>
                    </li>
                    {/* // Todo: check aaur kuch krna hai kya */}
                </ul>
            </nav>
        </div>
    )
}

