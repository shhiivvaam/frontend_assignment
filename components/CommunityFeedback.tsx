import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function CommunityFeedback() {
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
                            <span className="font-medium">134</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                            <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "74.4%" }} />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-gray-600">Neutral</span>
                            <span className="font-medium">34</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                            <div className="bg-yellow-400 h-2 rounded-full" style={{ width: "18.9%" }} />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-gray-600">Negative</span>
                            <span className="font-medium">12</span>
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