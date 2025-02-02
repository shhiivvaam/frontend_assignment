import { Sidebar } from "@/components/Sidebar"
import { KPICards } from "@/components/KPICards"
import { PerformanceScore } from "@/components/PerformanceScore"
import { ComparisonChart } from "@/components/ComparisonChart"
import { CustomersChart } from "@/components/CustomersChart"
import { TopProducts } from "@/components/TopProducts"
import { CommunityFeedback } from "@/components/CommunityFeedback"

export default function DashboardPage() {
    return (
        <div className="flex h-screen bg-white">
            <Sidebar />
            <div className="flex-1 overflow-auto">
                <div className="p-8">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-2xl font-bold">Dashboard</h1>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-500">Compare to</span>
                            <select className="border rounded-md px-3 py-1.5 text-sm">
                                <option>Last year</option>
                                <option>Previous year</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mb-6">
                        <div className="col-span-3">
                            <KPICards />
                        </div>
                        <PerformanceScore />
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="col-span-2">
                            <ComparisonChart />
                        </div>
                        <div className="space-y-4">
                            <CustomersChart />
                            <CommunityFeedback />
                        </div>
                    </div>

                    <div>
                        <TopProducts />
                    </div>
                </div>
            </div>
        </div>
    )
}

