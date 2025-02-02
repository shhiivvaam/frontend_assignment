import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react"

interface KPICardProps {
    title: string
    value: string
    change: number
    format?: string
}

export function KPICard({ title, value, change, format = "" }: KPICardProps) {
    const isPositive = change > 0

    return (
        <Card>
            <CardContent className="pt-6">
                <p className="text-sm text-gray-500">{title}</p>
                <div className="flex items-center justify-between mt-2">
                    <p className="text-2xl font-semibold">
                        {format}
                        {value}
                    </p>
                    <div className={`flex items-center gap-1 text-sm ${isPositive ? "text-green-600" : "text-red-600"}`}>
                        {isPositive ? <ArrowUpIcon className="w-4 h-4" /> : <ArrowDownIcon className="w-4 h-4" />}
                        <span>{Math.abs(change)}%</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

