"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"
import type { MonthlyData } from "@/lib/types"

const data: MonthlyData[] = [
    { month: "Jan", lastYear: 5000, thisYear: 6000 },
    { month: "Feb", lastYear: 10000, thisYear: 2000 },
    { month: "Mar", lastYear: 20000, thisYear: 40000 },
    { month: "Apr", lastYear: 32000, thisYear: 21000 },
    { month: "May", lastYear: 12000, thisYear: 9200 },
    { month: "Jun", lastYear: 13000, thisYear: 8700 },
]

export function ComparisonChart() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base font-semibold">Comparison</CardTitle>
                <button className="inline-flex items-center gap-1 text-sm border rounded-lg px-3 py-1.5">
                    6 months
                    <ChevronDown className="w-4 h-4" />
                </button>
            </CardHeader>
            <CardContent>
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
                </div>
            </CardContent>
        </Card>
    )
}