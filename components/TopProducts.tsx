import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

const products = [
    {
        name: "Camera Mi 360°",
        icon: "/placeholder.svg?height=32&width=32",
        soldAmount: 432,
        unitPrice: 120,
        revenue: 51840,
        rating: 4.81,
    },
    {
        name: "Massage Gun",
        icon: "/placeholder.svg?height=32&width=32",
        soldAmount: 120,
        unitPrice: 112,
        revenue: 25440,
        rating: 3.44,
    },
    {
        name: "Vacuum-Mop 2 Pro",
        icon: "/placeholder.svg?height=32&width=32",
        soldAmount: 221,
        unitPrice: 320,
        revenue: 15123,
        rating: 3.22,
    },
    {
        name: "Vacuum-Mop 2",
        icon: "/placeholder.svg?height=32&width=32",
        soldAmount: 223,
        unitPrice: 234,
        revenue: 32812,
        rating: 3.0,
    },
]

export function TopProducts() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base font-semibold">Top Products</CardTitle>
                <button className="text-sm text-blue-600 font-medium hover:text-blue-700">Full results</button>
            </CardHeader>
            <CardContent className="px-6">
                <table className="w-full">
                    <thead>
                        <tr className="text-left border-b">
                            <th className="pb-3 font-medium text-gray-500">Product</th>
                            <th className="pb-3 font-medium text-gray-500">Sold amount</th>
                            <th className="pb-3 font-medium text-gray-500">Unit price</th>
                            <th className="pb-3 font-medium text-gray-500">Revenue</th>
                            <th className="pb-3 font-medium text-gray-500">Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.name} className="border-b last:border-b-0">
                                <td className="py-4">
                                    <div className="flex items-center gap-3">
                                        <Image
                                            src={product.icon || "/placeholder.svg"}
                                            alt={product.name}
                                            width={32}
                                            height={32}
                                            className="rounded-full"
                                        />
                                        <span className="font-medium">{product.name}</span>
                                    </div>
                                </td>
                                <td className="py-4">{product.soldAmount}</td>
                                <td className="py-4">${product.unitPrice}</td>
                                <td className="py-4">${product.revenue.toLocaleString()}</td>
                                <td className="py-4">
                                    <span className="text-orange-400">★</span> <span>{product.rating.toFixed(2)}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </CardContent>
        </Card>
    )
}