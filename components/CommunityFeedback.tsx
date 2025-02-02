"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { fetchSentimentData } from "@/lib/api"
import type { SentimentData } from "@/lib/types"

export function CommunityFeedback() {

    const [data, setData] = useState<SentimentData | null>(null)
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchSentimentData();
                setData(result)
            } catch (err) {
                setError("Failed to load sentiment data")
            }
        }

        fetchData()
    }, [])

    if (error) return <div className="text-red-500">{error}</div>
    if (!data) return <div>Loading...</div>


    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base font-semibold">Community feedback</CardTitle>
            </CardHeader>
            <CardContent>
                <h3 className="text-lg font-semibold mb-6">Mostly positive</h3>
                <div className="space-y-6">
                    <div>
                        <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-gray-600">Positive</span>
                            <span className="font-medium">{data.positive}</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                            <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "74.4%" }} />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-gray-600">Neutral</span>
                            <span className="font-medium">{data.neutral}</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                            <div className="bg-yellow-400 h-2 rounded-full" style={{ width: "18.9%" }} />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-gray-600">Negative</span>
                            <span className="font-medium">{data.negative}</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                            <div className="bg-red-400 h-2 rounded-full" style={{ width: "6.7%" }} />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}