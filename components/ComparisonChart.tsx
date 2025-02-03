"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"
import type { MonthlyData } from "@/lib/types"
import { Skeleton } from "@/components/ui/skeleton"
import { useState, useEffect } from "react"

// const data: MonthlyData[] = [
//     { month: "Jan", lastYear: 5000, thisYear: 6000 },
//     { month: "Feb", lastYear: 10000, thisYear: 2000 },
//     { month: "Mar", lastYear: 20000, thisYear: 40000 },
//     { month: "Apr", lastYear: 32000, thisYear: 21000 },
//     { month: "May", lastYear: 12000, thisYear: 9200 },
//     { month: "Jun", lastYear: 13000, thisYear: 8700 },
// ]

function ComparisonChartSkeleton() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-8 w-1/6" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-[300px] w-full" />
            </CardContent>
        </Card>
    )
}

export function ComparisonChart({ tableName }: { tableName: string }) {

    const [data, setData] = useState<MonthlyData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`/api/fetchData?table=${tableName}`);
                const fetchedData = await response.json();

                if (!response.ok) {
                    throw new Error(fetchedData.error || "Error fetching data");
                }

                const formattedData: MonthlyData[] = fetchedData.map((row: any) => ({
                    month: row.Month,
                    lastYear: Number(row.Last_year),
                    thisYear: Number(row.This_year),
                }));

                setData(formattedData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, [tableName]);

    if (loading) return <ComparisonChartSkeleton />;

    // const [loading, setLoading] = useState(true)

    // useEffect(() => {
    //     const timer = setTimeout(() => setLoading(false), 1000)
    //     return () => clearTimeout(timer)
    // }, [])

    // if (loading) return <ComparisonChartSkeleton />

    return (
        <div className="space-y-4">
            <div className="flex flex-row items-center justify-between">
                <div className="text-base font-bold">Comparison</div>
                <button className="inline-flex items-center gap-1 text-sm border font-semibold rounded-3xl px-3 py-1.5">
                    6 months
                    <ChevronDown className="w-4 h-4" />
                </button>
            </div>
            <div>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} fontSize={12} tickMargin={10} />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                fontSize={12}
                                tickMargin={10}
                                tickFormatter={(value) => `${value / 1000}k`}
                            />
                            <Tooltip />
                            <Bar dataKey="lastYear" name="Last year" fill="#E3F2FD" radius={[4, 4, 0, 0]} maxBarSize={40} />
                            <Bar dataKey="thisYear" name="This year" fill="#2196F3" radius={[4, 4, 0, 0]} maxBarSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center items-center text-center font-semibold gap-10">
                        <div className="flex gap-2 text-center items-center">
                            <div className="w-3 h-3 rounded-sm bg-blue-500" />
                            <span className="text-gray-500">This Year</span>
                        </div>
                        <div className="flex gap-2 text-center items-center">
                            <span className="w-3 h-3 rounded-sm bg-blue-300" />
                            <span className="text-gray-500">Last Year</span>
                        </div>
                    </div>
                    {/* <div className="flex items-start gap-8 text-sm w-full font-semibold">
                        <div className="flex flex-col gap-1">
                            <div className="flex justify-center items-center gap-2">
                            </div>
                            <span className="font-semibold ml-1">{ }%</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                            </div>
                            <span className="font-semibold ml-1">{ }%</span>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

