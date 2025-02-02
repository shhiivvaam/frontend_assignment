import { getAuthHeader } from "@/lib/auth"

const API_BASE_URL = "http://3.111.196.92:8020/api/v1"

export async function fetchKPIData() {
    const response = await fetch(`${API_BASE_URL}/sample_assignment_api_1/`, {
        headers: getAuthHeader(),
    })
    if (!response.ok) throw new Error("Failed to fetch KPI data")
    return response.json()
}

export async function fetchPerformanceData() {
    const response = await fetch(`${API_BASE_URL}/sample_assignment_api_3/`, {
        headers: getAuthHeader(),
    })
    if (!response.ok) throw new Error("Failed to fetch performance data")
    return response.json()
}

export async function fetchTimeSeriesData() {
    const response = await fetch(`${API_BASE_URL}/sample_assignment_api_4/`, {
        headers: getAuthHeader(),
    })
    if (!response.ok) throw new Error("Failed to fetch time series data")
    return response.json()
}

export async function fetchSentimentData() {
    const response = await fetch(`${API_BASE_URL}/sample_assignment_api_5/`, {
        headers: getAuthHeader(),
    })
    if (!response.ok) throw new Error("Failed to fetch sentiment data")
    return response.json()
}

