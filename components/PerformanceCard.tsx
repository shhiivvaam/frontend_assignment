"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { fetchPerformanceData } from "@/lib/api"
import type { PerformanceData } from "@/lib/types"

export function PerformanceCard() {

    const [data, setData] = useState<PerformanceData | null>(null)
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchPerformanceData()
                setData(result)
            } catch (err) {
                setError("Failed to load performance data")
            }
        }

        fetchData()
    }, [])

    if (error) return <div className="text-red-500">{error}</div>
    if (!data) return <div>Loading...</div>

    return (
        <Card>
            <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                    <div className="relative w-32 h-32">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                            <circle
                                className="text-gray-200"
                                strokeWidth="10"
                                stroke="currentColor"
                                fill="transparent"
                                r="40"
                                cx="50"
                                cy="50"
                            />
                            <circle
                                className="text-blue-500"
                                strokeWidth="10"
                                strokeDasharray={251.2}
                                strokeDashoffset={251.2 * 0.22}
                                strokeLinecap="round"
                                stroke="currentColor"
                                fill="transparent"
                                r="40"
                                cx="50"
                                cy="50"
                            />
                        </svg>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                            <div className="text-3xl font-bold">{data.score}</div>
                            <div className="text-xs text-gray-500">of 100 points</div>
                        </div>
                    </div>
                    <h3 className="mt-4 text-xl font-semibold">{data.title}</h3>
                    <p className="mt-1 text-sm text-gray-500 text-center">
                        {data.message}
                    </p>
                    <button className="mt-4 text-blue-600 text-sm font-medium">Improve your score</button>
                </div>
            </CardContent>
        </Card>
    )
}

