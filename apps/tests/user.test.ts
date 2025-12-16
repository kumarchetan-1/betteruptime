import axios from "axios"
import { describe, it, expect, beforeAll } from "bun:test"
import { BASE_URL } from "./config"

describe("User endpoint", ()=>{
    let testUsername: string

    beforeAll(() => {
        testUsername = `testuser_${Math.random().toString(36).substring(7)}`
    })

    describe("POST /signup", ()=>{

        it("Successfully creates user", async()=>{
            const response = await axios.post(`${BASE_URL}/v1/user/signup`, {
                data: {
                    username: `${testUsername}_success`,
                    password: "password123",
                    name: "Test User"
                }
            })
            expect(response.status).toBe(200)
            expect(response.data.userId).toBeDefined()
        })

        it("Returns 403 when username is missing", async()=>{
            try {
                await axios.post(`${BASE_URL}/v1/user/signup`, {
                    data: {
                        password: "password123"
                    }
                })
                expect(false, "Request should have failed").toBe(true)
            } catch (error: any) {
                expect(error.response.status).toBe(403)
                expect(error.response.data.message).toBe("username and password are required")
            }
        })

        it("Returns 403 when password is missing", async()=>{
            try {
                await axios.post(`${BASE_URL}/v1/user/signup`, {
                    data: {
                        username: `${testUsername}_nopass`
                    }
                })
                expect(false, "Request should have failed").toBe(true)
            } catch (error: any) {
                expect(error.response.status).toBe(403)
                expect(error.response.data.message).toBe("username and password are required")
            }
        })

        it("Returns 401 when username already exists", async()=>{
            const duplicateUsername = `${testUsername}_duplicate`
            
            await axios.post(`${BASE_URL}/v1/user/signup`, {
                data: {
                    username: duplicateUsername,
                    password: "password123",
                    name: "First User"
                }
            })

            try {
                await axios.post(`${BASE_URL}/v1/user/signup`, {
                    data: {
                        username: duplicateUsername,
                        password: "password456"
                    }
                })
                expect(false, "Request should have failed").toBe(true)
            } catch (error: any) {
                expect(error.response.status).toBe(401)
                expect(error.response.data.message).toBe("Username already exist in the db, please signin.")
            }
        })
    })

    describe("POST /signin", ()=>{
        let signinUsername: string
        let signinPassword: string

        beforeAll(async()=>{
            // Create a user first for signin tests
            signinUsername = `${testUsername}_signin`
            signinPassword = "password123"
            await axios.post(`${BASE_URL}/v1/user/signup`, {
                data: {
                    username: signinUsername,
                    password: signinPassword,
                    name: "Signin Test User"
                }
            })
        })

        it("Successfully signin", async()=>{
            const response = await axios.post(`${BASE_URL}/v1/user/signin`, {
                data: {
                    username: signinUsername,
                    password: signinPassword
                }
            })
            expect(response.status).toBe(200)
            expect(response.data.jwt).toBeDefined()
        })

        it("Returns 400 when username is missing", async()=>{
            try {
                await axios.post(`${BASE_URL}/v1/user/signin`, {
                    data: {
                        password: "password123"
                    }
                })
                expect(false, "Request should have failed").toBe(true)
            } catch (error: any) {
                expect(error.response.status).toBe(400)
                expect(error.response.data.message).toBe("Invalid data format")
            }
        })

        it("Returns 400 when password is missing", async()=>{
            try {
                await axios.post(`${BASE_URL}/v1/user/signin`, {
                    data: {
                        username: `${testUsername}_nopass`,
                        password: ""
                    }
                })
                expect(false, "Request should have failed").toBe(true)
            } catch (error: any) {
                expect(error.response.status).toBe(400)
                expect(error.response.data.message).toBe("Username and password are required")
            }
        })

        it("Returns 403 when username doesn't exist", async()=>{
            try {
                await axios.post(`${BASE_URL}/v1/user/signin`, {
                    data: {
                        username: `${testUsername}_nonexistent`,
                        password: "password456"
                    }
                })
                expect(false, "Request should have failed").toBe(true)
            } catch (error: any) {
                expect(error.response.status).toBe(403)
                expect(error.response.data.message).toBe("User not found")
            }
        })

        it("Returns 401 when incorrect password", async()=>{
            try {
                await axios.post(`${BASE_URL}/v1/user/signin`, {
                    data: {
                        username: signinUsername,
                        password: "incorrectPass"
                    }
                })
                expect(false, "Request should have failed").toBe(true)
            } catch (error: any) {
                expect(error.response.status).toBe(401)
                expect(error.response.data.message).toBe("Incorrect password")
            }
        })

    })

})