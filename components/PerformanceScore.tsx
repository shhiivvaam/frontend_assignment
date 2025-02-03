"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useState } from "react"
import { fetchPerformanceData } from "@/lib/api"
import type { PerformanceData } from "@/lib/types"

function PerformanceScoreSkeleton() {
    return (
        <Card className="bg-white max-w-sm mx-auto rounded-3xl">
            <CardContent className="p-8">
                <div className="flex flex-col items-center">
                    <div className="relative w-40 h-24 mb-5">
                        <Skeleton className="w-full h-full rounded-full" />
                        <div className="pt-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                            <Skeleton className="h-8 w-16" />
                        </div>
                        <Skeleton className="h-4 w-24 mx-auto mt-2" />
                    </div>
                    <Skeleton className="h-px w-full my-7" />
                    <Skeleton className="h-7 w-32 mb-2" />
                    <Skeleton className="h-4 w-64 mb-6" />
                    <Skeleton className="h-10 w-40 rounded-full" />
                </div>
            </CardContent>
        </Card>
    )
}

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
    // if (!data) return <div>Loading...</div>
    if (!data) return <PerformanceScoreSkeleton />

    return (
        <Card className="bg-white max-w-sm mx-auto rounded-3xl">
            <CardContent className="p-8">
                <div className="flex flex-col items-center">
                    <div className="relative w-40 h-24 mb-5">
                        <svg className="w-full h-full" viewBox="0 0 100 50">
                            <path d="M 5 45 A 40 40 0 0 1 95 45" fill="none" stroke="#EDF2F7" strokeWidth="4" strokeLinecap="round" />
                            <path
                                d="M 5 45 A 40 40 0 0 1 95 45"
                                fill="none"
                                stroke="#3B82F6"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeDasharray="141.37"
                                strokeDashoffset="31.10"
                            />
                        </svg>
                        <div className="pt-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                            <span className="text-3xl font-bold">{data.score}</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-500 block text-center">of 100 points</span>
                    </div>
                    <h3 className="text-xl font-bold mt-6 border-t w-full pt-7">{data.title}!</h3>
                    <p className="text-sm font-semibold text-gray-500 mt-2 max-w-[280px]">
                        {data.message}
                    </p>
                    <button className="flex items-start align-top left-0 mt-6 px-6 py-2.5 text-sm font-semibold text-gray-700 rounded-full border border-gray-200 hover:bg-gray-50">
                        Improve your score
                    </button>
                </div>
            </CardContent>
        </Card>
    )
}

