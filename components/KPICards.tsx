import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react"

interface KPICardProps {
    title: string
    value: string
    change: number
    prefix?: string
}

function KPICard({ title, value, change, prefix = "" }: KPICardProps) {
    const isPositive = change > 0

    return (
        <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
                <h3 className="text-sm text-gray-500 font-medium">{title}</h3>
                <div className="flex items-center justify-between mt-2">
                    <p className="text-2xl font-semibold">
                        {prefix}
                        {value}
                    </p>
                    <div className={`flex items-center gap-1 text-sm ${isPositive ? "text-emerald-600" : "text-red-500"}`}>
                        {isPositive ? <ArrowUpIcon className="w-4 h-4" /> : <ArrowDownIcon className="w-4 h-4" />}
                        <span>{Math.abs(change)}%</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export function KPICards() {
    return (
        <div className="grid grid-cols-3 gap-4">
            <KPICard title="Purchases" value="4,294" change={32} />
            <KPICard title="Revenue" value="322.3k" change={49} prefix="$" />
            <KPICard title="Refunds" value="8.2k" change={-7} prefix="$" />
        </div>
    )
}

