export interface LoginCredentials {
    username: string
    email: string
    password: string
    phone_number: string
    input_code: number
}

export interface KPIData {
    purchases: number
    revenue: number
    refunds: number
}

export interface PerformanceData {
    score: number
    title: string
    message: string
}

export interface TimeSeriesData {
    date2: string
    unique_count: number
    cumulative_tweets: number
}

export interface SalesCountData {
    date: string
    web_sales: number
    offline_sales: number
}

export interface SentimentData {
    negative: number
    positive: number
    neutral: number
}

export interface MonthlyData {
    month: string
    lastYear: number
    thisYear: number
}

export interface ProductData {
    name: string
    soldAmount: number
    unitPrice: number
    revenue: number
    rating: number
    image: string
}

