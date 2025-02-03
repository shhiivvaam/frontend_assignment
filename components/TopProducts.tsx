import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import type { ProductData } from "@/lib/types"

const products: ProductData[] = [
    {
        name: "Camera Mi 360°",
        soldAmount: 432,
        unitPrice: 120,
        revenue: 51840,
        rating: 4.81,
        image: "/camera.png",
    },
    {
        name: "Massage Gun",
        soldAmount: 120,
        unitPrice: 112,
        revenue: 25440,
        rating: 3.44,
        image: "/massage.png",
    },
    {
        name: "Vacuum-Mop 2 Pro",
        soldAmount: 221,
        unitPrice: 320,
        revenue: 15123,
        rating: 3.22,
        image: "/vacuum-pro.png",
    },
    {
        name: "Vacuum-Mop 2",
        soldAmount: 223,
        unitPrice: 234,
        revenue: 32812,
        rating: 3.0,
        image: "/vacuum.png",
    },
]

export function TopProducts() {
    return (
        <div className="w-full">
            <div className="flex flex-row items-center justify-between mb-6">
                <div className="text-base font-semibold">Top Products</div>
                <button className="inline-flex items-center text-gray-500 font-bold gap-1 text-sm border rounded-3xl px-3 py-2">
                    Full results
                </button>
            </div>
            <div>
                <table className="w-full">
                    <thead>
                        <tr className="text-left text-sm font-semibold border-b-2 border-gray-100">
                            <th className="pb-4 text-gray-400">Product</th>
                            <th className="pb-4 text-gray-400">Sold amount</th>
                            <th className="pb-4 text-gray-400">Unit price</th>
                            <th className="pb-4 text-gray-400">Revenue</th>
                            <th className="pb-4 text-gray-400">Rating</th>
                        </tr>
                    </thead>
                    {/* <div className="h-[10px] w-full bg-gray-100"></div> */}
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.name}>
                                <td className="py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                            <Image
                                                src={product.image || "/placeholder.svg"}
                                                alt={product.name}
                                                width={20}
                                                height={20}
                                                className="opacity-75"
                                            />
                                        </div>
                                        <span className="text-black font-semibold">{product.name}</span>
                                    </div>
                                </td>
                                <td className="py-4 text-gray-600 font-semibold">{product.soldAmount}</td>
                                <td className="py-4 text-gray-600 font-semibold">${product.unitPrice}</td>
                                <td className="py-4 text-gray-600 font-semibold">${product.revenue.toLocaleString()}</td>
                                <td className="py-4 font-semibold">
                                    <div className="flex items-center gap-1 text-black">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-orange-400">
                                            <path
                                                d="M8 0L10.2571 5.08661L16 5.81147L11.8857 9.66339L13.0857 15L8 12.2866L2.91429 15L4.11429 9.66339L0 5.81147L5.74286 5.08661L8 0Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                        {product.rating.toFixed(2)}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}