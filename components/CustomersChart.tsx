"use client"

import { useEffect, useState } from "react"
import { fetchTimeSeriesData } from "@/lib/api"
import type { TimeSeriesData } from "@/lib/types"
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
    if (!data.length) return <CustomersChartSkeleton />

    const chartData = data.map((item) => ({
        date: new Date(item.date2).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        web: item.unique_count,
        offline: item.cumulative_tweets - item.unique_count,
    }))

    // growth ki percentage
    const firstWeb = chartData[0].web
    const lastWeb = chartData[chartData.length - 1].web
    const firstOffline = chartData[0].offline
    const lastOffline = chartData[chartData.length - 1].offline

    const webGrowth = (((lastWeb - firstWeb) / firstWeb) * 100).toFixed(0)
    const offlineGrowth = (((lastOffline - firstOffline) / firstOffline) * 100).toFixed(0)

    return (
        <Card className="rounded-2xl w-full">
            <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-6">Customers by device</h2>
                <div className="h-[180px] mb-6">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E5E7EB" />
                            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 12 }} />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                                tickFormatter={(value) => `${value / 1000}k`}
                            />
                            <Tooltip />
                            <Line type="monotone" dataKey="web" stroke="#3B82F6" strokeWidth={2} dot={false} name="Web sales" />
                            <Line
                                type="monotone"
                                dataKey="offline"
                                stroke="#93C5FD"
                                strokeWidth={2}
                                dot={false}
                                name="Offline selling"
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

