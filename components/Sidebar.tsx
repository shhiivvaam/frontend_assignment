import Link from "next/link"
import { ChevronLeft, Settings, Users, LayoutDashboard, LineChart, Share2, Grid3X3, Users2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Sidebar() {
    return (
        <div className="w-[240px] h-screen bg-[#F8FAFC] border-r flex flex-col">
            <div className="p-6">
                <div className="flex items-center gap-4">
                    <ChevronLeft className="h-5 w-5" />
                    <span className="font-semibold">Salesway</span>
                </div>
            </div>

            <div className="px-3 py-2">
                <div className="space-y-1">
                    <Link
                        href="/settings"
                        className="flex items-center gap-4 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                    >
                        <Settings size={18} />
                        Settings
                    </Link>
                    <Link href="/team" className="flex items-center gap-4 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
                        <Users size={18} />
                        Team
                    </Link>
                </div>
            </div>

            <div className="px-3 py-2">
                <p className="px-3 text-xs font-semibold text-gray-400 mb-2">MENU</p>
                <div className="space-y-1">
                    <Link href="/dashboard" className="flex items-center gap-4 px-3 py-2 bg-white shadow-sm text-black hover:bg-blue font-semibold rounded-md">
                        <LayoutDashboard size={18} color="#2090ba" fill="#2090ba" />
                        Dashboard
                    </Link>
                    <Link
                        href="/campaigns"
                        className="flex items-center gap-4 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                    >
                        <LineChart size={18} />
                        Campaigns
                    </Link>
                    <Link href="/flows" className="flex items-center gap-4 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
                        <Share2 size={18} />
                        Flows
                    </Link>
                    <Link
                        href="/integrations"
                        className="flex items-center gap-4 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                    >
                        <Grid3X3 size={18} />
                        Integrations
                    </Link>
                    <Link
                        href="/customers"
                        className="flex items-center gap-4 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                    >
                        <Users2 size={18} />
                        Customers
                    </Link>
                </div>
            </div>

            <div className="mt-auto p-4">
                <div className="flex items-center gap-4">
                    <Avatar>
                        <AvatarImage src="https://avatars.githubusercontent.com/u/96204332?v=4" alt="Shivam Kumar" />
                        <AvatarFallback>SK</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm font-medium">Shivam Kumar</p>
                    </div>
                </div>
            </div>
        </div>
    )
}