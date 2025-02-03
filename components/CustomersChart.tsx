"use client"

import { useEffect, useState } from "react"
import { fetchTimeSeriesData } from "@/lib/api"
import type { TimeSeriesData, SalesCountData } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"
import { Skeleton } from "@/components/ui/skeleton"

// const data = [
//     { month: "Jan", web: 2000, offline: 1000 },
//     { month: "Feb", web: 3000, offline: 1500 },
//     { month: "Mar", web: 4000, offline: 2000 },
//     { month: "Apr", web: 5000, offline: 2500 },
//     { month: "May", web: 6000, offline: 3000 },
//     { month: "Jun", web: 8000, offline: 3500 },
// ]

function CustomersChartSkeleton() {
    return (
        <Card className="rounded-3xl">
            <CardContent className="p-6">
                <Skeleton className="h-7 w-1/2 mb-6" />
                <Skeleton className="h-[180px] w-full mb-6" />
                <div className="flex gap-8">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-24" />
                </div>
            </CardContent>
        </Card>
    )
}

export function CustomersChart({ tableName }: { tableName: string }) {
    const [chartData, setChartData] = useState<TimeSeriesData[]>([])
    const [salesData, setSalesData] = useState<SalesCountData[]>([])
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const result = await fetchTimeSeriesData()
                setChartData(result)
            } catch (err) {
                setError("Failed to load time series data")
            }
        }

        const fetchSalesData = async () => {
            try {
                const response = await fetch(`/api/fetchData?table=${tableName}`)
                if (!response.ok) throw new Error("Failed to fetch sales data")
                const result = await response.json()
                setSalesData(result)
            } catch (err) {
                setError("Failed to load sales data")
            }
        }

        fetchChartData()
        fetchSalesData()
    }, [tableName])

    if (error) return <div className="text-red-500">{error}</div>
    if (!chartData.length || !salesData.length) return <CustomersChartSkeleton />

    const formattedChartData = chartData.map((item, index) => ({
        // date: new Date(item.date2).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        index,
        unique_count: item.unique_count,
        cumulative_tweets: item.cumulative_tweets,
    }))

    // growth ki presentage
    const firstWeb = Number.parseInt(salesData[0].web_sales.toString())
    const lastWeb = Number.parseInt(salesData[salesData.length - 1].web_sales.toString())
    const firstOffline = Number.parseInt(salesData[0].offline_sales.toString())
    const lastOffline = Number.parseInt(salesData[salesData.length - 1].offline_sales.toString())

    const webGrowth = (((lastWeb - firstWeb) / firstWeb) * 100).toFixed(0)
    const offlineGrowth = (((lastOffline - firstOffline) / firstOffline) * 100).toFixed(0)

    return (
        <Card className="rounded-2xl w-full">
            <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-6">Customers by device</h2>
                <div className="h-[180px] mb-6">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={formattedChartData}>
                            <CartesianGrid strokeDasharray="2 2" horizontal={true} vertical={false} stroke="#E5E7EB" />
                            {/* <XAxis axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 12 }} /> */}
                            <XAxis dataKey="index" axisLine={false} tickLine={false} tick={false} />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                                tickCount={3}
                                domain={[0, 800]}
                                ticks={[0, 400, 800]}
                                tickFormatter={(value) => `${value / 100}k`}
                            />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="unique_count"
                                stroke="#3B82F6"
                                strokeWidth={2}
                                dot={false}
                                name="Unique Count"
                            />
                            <Line
                                type="monotone"
                                dataKey="cumulative_tweets"
                                stroke="#93C5FD"
                                strokeWidth={2}
                                dot={false}
                                name="Cumulative Tweets"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex items-start gap-8 text-sm w-full font-semibold">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <span className="text-gray-500">Web sales</span>
                            <div className="w-3 h-3 rounded-sm bg-blue-500" />
                        </div>
                        <span className="font-semibold ml-1">{webGrowth}%</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <span className="text-gray-500">Offline selling</span>
                            <div className="w-3 h-3 rounded-sm bg-blue-300" />
                        </div>
                        <span className="font-semibold ml-1">{offlineGrowth}%</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

