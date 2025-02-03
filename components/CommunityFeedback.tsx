"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { fetchSentimentData } from "@/lib/api"
import type { SentimentData } from "@/lib/types"
import { Skeleton } from "@/components/ui/skeleton"

function CommunityFeedbackSkeleton() {
    return (
        <Card className="rounded-3xl">
            <CardContent className="p-6">
                <Skeleton className="h-5 w-1/2 mb-4" />
                <Skeleton className="h-6 w-2/3 mb-6" />
                <Skeleton className="h-2 w-full mb-4" />
                <div className="flex justify-between text-sm">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-16" />
                </div>
            </CardContent>
        </Card>
    )
}

export function CommunityFeedback() {
    const [data, setData] = useState<SentimentData | null>(null)
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchSentimentData()
                setData(result)
            } catch (err) {
                setError("Failed to load sentiment data")
            }
        }

        fetchData()
    }, [])

    if (error) return <div className="text-red-500">{error}</div>
    if (!data) return <CommunityFeedbackSkeleton />

    const total = data.positive + data.neutral + data.negative
    const positiveWidth = (data.positive / total) * 100
    const neutralWidth = (data.neutral / total) * 100
    const negativeWidth = (data.negative / total) * 100

    return (
        <Card className="rounded-3xl">
            <CardContent className="p-6">
                <h2 className="text-gray-500 font-semibold mb-1 text-sm">Community feedback</h2>
                <h3 className="text-xl font-semibold mb-6">Mostly positive</h3>

                <div className="h-2 w-full flex rounded-full overflow-hidden mb-4 gap-1">
                    <div className="bg-red-300 rounded-full" style={{ width: `${negativeWidth}%` }} />
                    <div className="bg-yellow-300 rounded-full" style={{ width: `${neutralWidth}%` }} />
                    <div className="bg-emerald-400 rounded-full" style={{ width: `${positiveWidth}%` }} />
                </div>

                <div className="flex gap-2 font-semibold justify-start text-sm text-gray-500">
                    <div className="flex flex-col items-center gap-1">
                        <span>Negative</span>
                        <span className="font-extrabold text-gray-700">{data.negative}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <span>Neutral</span>
                        <span className="font-extrabold text-gray-700">{data.neutral}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <span>Positive</span>
                        <span className="font-extrabold text-gray-700">{data.positive}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}