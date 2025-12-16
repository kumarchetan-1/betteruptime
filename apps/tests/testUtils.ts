import axios from "axios"
import { BASE_URL } from "./config"

export async function createUser(): Promise<{
    jwt: String,
    id: String
}> {
    // Generate unique username for each call
    const USER_NAME = `testuser_${Math.random().toString(36).substring(7)}_${Date.now()}`

    const signUpRes = await axios.post(`${BASE_URL}/v1/user/signup`, {
        data: {
            username: USER_NAME,
            password: "134123432"
        }
    })

    const signInRes = await axios.post(`${BASE_URL}/v1/user/signin`, {
        data: {
            username: USER_NAME,
            password: "134123432"
        }
    })

    return {
        id: signUpRes.data.userId,
        jwt: signInRes.data.jwt
    }
    
}