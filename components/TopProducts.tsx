import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const products = [
    {
        name: "Camera Mi 360°",
        soldAmount: 432,
        unitPrice: 120,
        revenue: 51840,
        rating: 4.81,
    },
    {
        name: "Massage Gun",
        soldAmount: 120,
        unitPrice: 112,
        revenue: 25440,
        rating: 3.44,
    },
    {
        name: "Vacuum-Mop 2 Pro",
        soldAmount: 221,
        unitPrice: 320,
        revenue: 15123,
        rating: 3.22,
    },
    {
        name: "Vacuum-Mop 2",
        soldAmount: 223,
        unitPrice: 234,
        revenue: 32812,
        rating: 3.0,
    },
]

export function TopProducts() {
    return (
        <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-semibold">Top Products</CardTitle>
                <button className="text-sm text-blue-600 font-medium">Full results</button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead>Sold amount</TableHead>
                            <TableHead>Unit price</TableHead>
                            <TableHead>Revenue</TableHead>
                            <TableHead>Rating</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.name}>
                                <TableCell className="font-medium">{product.name}</TableCell>
                                <TableCell>{product.soldAmount}</TableCell>
                                <TableCell>${product.unitPrice}</TableCell>
                                <TableCell>${product.revenue.toLocaleString()}</TableCell>
                                <TableCell>★ {product.rating.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

