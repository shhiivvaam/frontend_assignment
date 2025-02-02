import { Card, CardContent } from "@/components/ui/card"

export function PerformanceScore() {
    return (
        <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                    <div className="relative w-32 h-32">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle
                                cx="64"
                                cy="64"
                                r="56"
                                stroke="currentColor"
                                strokeWidth="16"
                                fill="none"
                                className="text-blue-100"
                            />
                            <circle
                                cx="64"
                                cy="64"
                                r="56"
                                stroke="currentColor"
                                strokeWidth="16"
                                fill="none"
                                strokeDasharray="352"
                                strokeDashoffset="88"
                                className="text-blue-500"
                            />
                        </svg>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                            <span className="text-3xl font-bold">78</span>
                            <span className="text-xs text-gray-500 block">of 100 points</span>
                        </div>
                    </div>
                    <h3 className="text-xl font-semibold mt-4">You're good!</h3>
                    <p className="text-sm text-gray-500 text-center mt-1">
                        Your sales performance score is better than 80% other users
                    </p>
                    <button className="mt-4 text-blue-600 text-sm font-medium">Improve your score</button>
                </div>
            </CardContent>
        </Card>
    )
}

