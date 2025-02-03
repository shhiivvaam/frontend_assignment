import { Sidebar } from "@/components/Sidebar"
import { KPICards } from "@/components/KPICards"
import { PerformanceScore } from "@/components/PerformanceScore"
import { ComparisonChart } from "@/components/ComparisonChart"
import { CustomersChart } from "@/components/CustomersChart"
import { TopProducts } from "@/components/TopProducts"
import { CommunityFeedback } from "@/components/CommunityFeedback"
import { ChevronDown } from "lucide-react"

export default function DashboardPage() {
    return (
        <div className="flex min-h-screen bg-[#FAFAFA]">
            <Sidebar />
            <div className="flex-1 p-8">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500">Compare to</span>
                        <button className="inline-flex items-center gap-2 text-sm border rounded-lg px-3 py-1.5 bg-white">
                            Last year
                            <ChevronDown className="w-4 h-4 text-gray-500" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-6">
                    <div className="col-span-3">
                        <div className="space-y-6">
                            <KPICards />
                            <ComparisonChart />
                            <TopProducts />
                        </div>
                    </div>
                    <div className="space-y-6">
                        <PerformanceScore />
                        <CustomersChart />
                        <CommunityFeedback />
                    </div>
                </div>
            </div>
        </div>
    )
}

