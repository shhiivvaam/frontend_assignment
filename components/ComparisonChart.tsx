"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown } from "lucide-react"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"

const data = [
    { month: "Jan", thisYear: 7000, lastYear: 3000 },
    { month: "Feb", thisYear: 10000, lastYear: 8000 },
    { month: "Mar", thisYear: 6000, lastYear: 3000 },
    { month: "Apr", thisYear: 20000, lastYear: 16000 },
    { month: "May", thisYear: 15000, lastYear: 8000 },
    { month: "Jun", thisYear: 6000, lastYear: 4000 },
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
                            <Bar dataKey="lastYear" fill="#E3F2FD" radius={[4, 4, 0, 0]} maxBarSize={40} />
                            <Bar dataKey="thisYear" fill="#2196F3" radius={[4, 4, 0, 0]} maxBarSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}