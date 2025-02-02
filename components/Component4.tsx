"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Assuming this is the structure of the data from the API and the Excel sheet
type DataItem = {
    id: number
    name: string
    value: number
}

export default function Component4() {
    const [apiData, setApiData] = useState<DataItem[]>([])
    const [excelData] = useState<DataItem[]>([
        { id: 1, name: "Item 1", value: 100 },
        { id: 2, name: "Item 2", value: 200 },
        { id: 3, name: "Item 3", value: 300 },
    ])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://3.111.196.92:8020/sample_assignment_api_4/", {
                    headers: {
                        Authorization: "Basic " + btoa("trial:assignment123"),
                    },
                })
                if (!response.ok) throw new Error("Network response was not ok")
                const result = await response.json()
                setApiData(result)
            } catch (error) {
                console.error("Error fetching data:", error)
            }
        }

        fetchData()
    }, [])

    return (
        <Card>
            <CardHeader>
                <CardTitle>Component 4</CardTitle>
            </CardHeader>
            <CardContent>
                <h3 className="text-lg font-semibold mb-2">API Data</h3>
                <Table className="mb-4">
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Value</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {apiData.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.value}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <h3 className="text-lg font-semibold mb-2">Excel Data</h3>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Value</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {excelData.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.value}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

