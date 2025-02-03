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
        <div className="p-4 bg-[#e1f0ff]">
            <div className="flex min-h-screen rounded-3xl shadow-sm bg-[#f3f9ff]">
                <Sidebar />
                <div className="flex-1 flex">
                    <div className="flex-1 p-8 pr-8 rounded-xl shadow-sm mt-2 mb-2 bg-white ">
                        <div className="flex items-center justify-between mb-8">
                            <h1 className="text-2xl font-semibold">Dashboard</h1>
                            <div className="flex items-center gap-3">
                                <span className="text-sm text-gray-500 font-semibold">Compare to</span>
                                <button className="inline-flex items-center gap-2 text-sm border font-semibold rounded-3xl px-3 py-1.5 bg-white">
                                    Last year
                                    <ChevronDown className="w-4 h-4 text-gray-500" />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <KPICards />
                            <ComparisonChart tableName="sheet1" />
                            <TopProducts tableName="sheet2" />
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="mt-2 pl-2 mr-2 max-w-sm">
                        <div className="space-y-2">
                            <PerformanceScore />
                            <CustomersChart />
                            <CommunityFeedback />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}