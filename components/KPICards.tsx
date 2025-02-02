"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react"
import { fetchKPIData } from "@/lib/api"
import type { KPIData } from "@/lib/types"

interface KPICardProps {
    title: string
    value: string | number
    change: number
    prefix?: string
}

function KPICard({ title, value, change, prefix = "" }: KPICardProps) {
    const isPositive = change > 0

    return (
        <Card>
            <CardContent className="pt-6">
                <h3 className="text-[13px] text-gray-500 font-medium">{title}</h3>
                <div className="flex items-center justify-between mt-2">
                    <p className="text-2xl font-bold tracking-tight">
                        {prefix}
                        {value}
                    </p>
                    <div
                        className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${isPositive ? "text-emerald-700 bg-emerald-50" : "text-red-700 bg-red-50"
                            }`}
                    >
                        {isPositive ? <ArrowUpIcon className="w-3 h-3" /> : <ArrowDownIcon className="w-3 h-3" />}
                        <span>{Math.abs(change)}%</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export function KPICards() {
    const [data, setData] = useState<KPIData | null>(null)
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchKPIData()
                setData(result)
            } catch (err) {
                setError("Failed to load KPI data")
            }
        }

        fetchData()
    }, [])

    if (error) return <div className="text-red-500">{error}</div>
    if (!data) return <div>Loading...</div>

    return (
        <div className="grid grid-cols-3 gap-4">
            <KPICard title="Purchases" value={data.purchases.toLocaleString()} change={32} />
            <KPICard title="Revenue" value={(data.revenue / 1000).toFixed(1) + "k"} change={49} prefix="$" />
            <KPICard title="Refunds" value={(data.refunds / 1000).toFixed(1) + "k"} change={-7} prefix="$" />
        </div>
    )
}