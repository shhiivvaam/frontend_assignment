"use client"

import { useEffect, useState } from "react"
import { fetchTimeSeriesData } from "@/lib/api"
import type { TimeSeriesData } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"

// const data = [
//     { month: "Jan", web: 2000, offline: 1000 },
//     { month: "Feb", web: 3000, offline: 1500 },
//     { month: "Mar", web: 4000, offline: 2000 },
//     { month: "Apr", web: 5000, offline: 2500 },
//     { month: "May", web: 6000, offline: 3000 },
//     { month: "Jun", web: 8000, offline: 3500 },
// ]

export function CustomersChart() {

    const [data, setData] = useState<TimeSeriesData[]>([])
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchTimeSeriesData()
                setData(result)
            } catch (err) {
                setError("Failed to load time series data")
            }
        }

        fetchData()
    }, [])

    if (error) return <div className="text-red-500">{error}</div>
    if (!data.length) return <div>Loading...</div>

    // chart k lia data
    const chartData = data.map((item) => ({
        date: new Date(item.date2).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        web: item.unique_count,
        offline: item.cumulative_tweets - item.unique_count,
    }))

    return (
        <Card className="border-0 shadow-sm">
            <CardHeader>
                <CardTitle className="text-lg font-semibold">Customers by device</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="web" name="Web sales" stroke="#2196F3" strokeWidth={2} dot={false} />
                            <Line
                                type="monotone"
                                dataKey="offline"
                                name="Offline selling"
                                stroke="#90CAF9"
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm">
                    <div>
                        <span className="text-blue-600">Web sales</span>
                        <span className="ml-2 font-semibold">{chartData[chartData.length - 1].web}</span>
                    </div>
                    <div>
                        <span className="text-blue-300">Offline selling</span>
                        <span className="ml-2 font-semibold">{chartData[chartData.length - 1].offline}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

