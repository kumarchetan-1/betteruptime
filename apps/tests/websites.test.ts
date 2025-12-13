import { describe, expect, it } from "bun:test"
import axios from "axios"

const BASE_URL =  "http://localhost:3000"
describe("Website gets created", ()=>{
    it("Website not created if url is not present", async()=>{
      try {
        await axios.post(`${BASE_URL}/website`)
        expect(false, "Website created when it shouldn't")
      } catch (error) {
        
      }
    })

    it("Website not created if url is not present", async()=>{
        const response = await axios.post(`${BASE_URL}/website`)
        expect(response.data.id).not.toBeNull()
    })
}) 