"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
        <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-semibold">Comparison</CardTitle>
                <Select defaultValue="6months">
                    <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="6months">6 months</SelectItem>
                        <SelectItem value="12months">12 months</SelectItem>
                        <SelectItem value="ytd">Year to date</SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="lastYear" fill="#E3F2FD" />
                            <Bar dataKey="thisYear" fill="#2196F3" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}

