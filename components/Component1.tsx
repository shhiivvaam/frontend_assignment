"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Component1() {
    const [data, setData] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://3.111.196.92:8020/sample_assignment_api_1/", {
                    headers: {
                        Authorization: "Basic " + btoa("trial:assignment123"),
                    },
                })
                if (!response.ok) throw new Error("Network response was not ok")
                const result = await response.json()
                setData(result)
            } catch (error) {
                console.error("Error fetching data:", error)
            }
        }

        fetchData()
    }, [])

    return (
        <Card>
            <CardHeader>
                <CardTitle>Component 1</CardTitle>
            </CardHeader>
            <CardContent>{data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}</CardContent>
        </Card>
    )
}

