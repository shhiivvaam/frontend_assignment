import type React from "react"
import { Sidebar } from "@/components/Sidebar"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen bg-black">
            <Sidebar />
            <div className="flex-1">{children}</div>
        </div>
    )
}