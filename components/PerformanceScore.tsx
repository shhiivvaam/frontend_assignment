"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { fetchPerformanceData } from "@/lib/api"
import type { PerformanceData } from "@/lib/types"

export function PerformanceScore() {

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
                        <svg className="w-full h-full transform -rotate-90">
                            <circle
                                cx="64"
                                cy="64"
                                r="58"
                                stroke="currentColor"
                                strokeWidth="8"
                                fill="none"
                                className="text-blue-100"
                            />
                            <circle
                                cx="64"
                                cy="64"
                                r="58"
                                stroke="currentColor"
                                strokeWidth="8"
                                fill="none"
                                strokeDasharray="364.425"
                                strokeDashoffset="91.106"
                                className="text-blue-500"
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                            <span className="text-3xl font-bold">{data.score}</span>
                            <span className="text-xs text-gray-500 block mt-0.5">of 100 points</span>
                        </div>
                    </div>
                    <h3 className="text-xl font-semibold mt-4">{data.title}</h3>
                    <p className="text-sm text-gray-500 text-center mt-1 max-w-[200px]">
                        {data.message}
                    </p>
                    <button className="mt-4 text-blue-600 text-sm font-medium hover:text-blue-700">Improve your score</button>
                </div>
            </CardContent>
        </Card>
    )
}