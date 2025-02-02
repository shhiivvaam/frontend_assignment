import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const data = [
    { month: "Jan", lastYear: 5000, thisYear: 6000 },
    { month: "Feb", lastYear: 10000, thisYear: 2000 },
    { month: "Mar", lastYear: 20000, thisYear: 40000 },
    { month: "Apr", lastYear: 32000, thisYear: 21000 },
    { month: "May", lastYear: 12000, thisYear: 9200 },
    { month: "Jun", lastYear: 13000, thisYear: 8700 },
]

export default function Component2() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Component 2</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Month</TableHead>
                            <TableHead>Last Year</TableHead>
                            <TableHead>This Year</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow key={row.month}>
                                <TableCell>{row.month}</TableCell>
                                <TableCell>{row.lastYear}</TableCell>
                                <TableCell>{row.thisYear}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}