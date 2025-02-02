import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function CommunityFeedback() {
    return (
        <Card className="border-0 shadow-sm">
            <CardHeader>
                <CardTitle className="text-lg font-semibold">Community feedback</CardTitle>
            </CardHeader>
            <CardContent>
                <h3 className="text-xl font-semibold mb-4">Mostly positive</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                        <span>Positive</span>
                        <span className="font-medium">134</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "75%" }} />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span>Neutral</span>
                        <span className="font-medium">34</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "15%" }} />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span>Negative</span>
                        <span className="font-medium">12</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: "10%" }} />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

