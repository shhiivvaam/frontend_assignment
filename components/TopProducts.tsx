import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import type { ProductData } from "@/lib/types"

const products: ProductData[] = [
    {
        name: "Camera Mi 360",
        soldAmount: 432,
        unitPrice: 120,
        revenue: 51320,
        rating: 4.81,
    },
    {
        name: "Message Gun",
        soldAmount: 120,
        unitPrice: 60,
        revenue: 23901,
        rating: 3.44,
    },
    {
        name: "Redmi Note 9",
        soldAmount: 190,
        unitPrice: 87.6,
        revenue: 87211,
        rating: 2.5,
    },
    {
        name: "One Plus Nord",
        soldAmount: 140,
        unitPrice: 24.1,
        revenue: 29809,
        rating: 4.65,
    },
]

export function TopProducts() {
    return (
        <div className="w-full">
            <div className="flex flex-row items-center justify-between">
                <CardTitle className="text-base font-semibold">Top Products</CardTitle>
                <button className="inline-flex items-center text-gray-500 font-bold gap-1 text-sm border rounded-3xl px-3 py-1.5">
                    Full results
                </button>
            </div>
            <div className="px-6">
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
                                        <Image src="/placeholder.svg" alt={product.name} width={32} height={32} className="rounded-full" />
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
            </div>
        </div>
    )
}