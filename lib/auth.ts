import { v4 as uuidv4 } from 'uuid';

interface LoginCredentials {
    username?: string
    password?: string
    email?: string
    phone_number?: string
    input_code?: number
}

const API_BASE_URL = "http://3.111.196.92:8020/api/v1"

export async function login(credentials: Partial<LoginCredentials>) {

    const payload = {
        ...credentials,
        email: credentials.email || "",
        phone_number: credentials.phone_number || "",
        input_code: credentials.input_code || 0,
    }
    const response = await fetch(`${API_BASE_URL}/login/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })

    if (!response.ok) {
        console.log("login failed");
        return null;
        // throw new Error("Login failed")
    }

    const token = uuidv4();
    localStorage.setItem("auth_token", token)
    document.cookie = `auth_token=${token}; path=/;`
    // cookies.set("auth_token", token, { path: "/" })
    return token
}

export function getAuthHeader() {
    return {
        Authorization: "Basic " + btoa("trial:assignment123"),
    }
}

export function isAuthenticated() {
    return !!localStorage.getItem("auth_token")
}

export function logout() {
    localStorage.removeItem("auth_token")
}