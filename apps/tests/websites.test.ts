import { beforeAll, describe, expect, it } from "bun:test"
import axios from "axios"
import { createUser } from "./testUtils"
import { BASE_URL } from "./config"

// Unit Test
// Arrange – setup data
// Act – call the API
// Assert – verify result

describe("Website API", ()=>{
let jwt: String, userId: String, websiteId: String

beforeAll(async()=>{
  const data = await createUser()
  jwt = data.jwt,
  userId =  data.id
})

describe("POST /website", ()=>{

    it("Website not created if url is not present", async()=>{
      try {
        await axios.post(`${BASE_URL}/v1/website`, {

        }, {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        })
        expect(false, "Website created when it shouldn't").toBe(true)
      } catch (error: any) {
        expect(error.response.status).toBe(400)
      }
    })

  it("Website created if url is present", async()=>{
    const response = await axios.post(`${BASE_URL}/v1/website`, {
      url : "chetankumar.me"
    }, {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
    })
    expect(response.data.id).not.toBeNull()
    expect(response.status).toBe(200)
    // Store websiteId for use in GET tests
    websiteId = response.data.id
    })

    it("Website is not created if Auth header is not present", async()=>{
        try {
          await axios.post(`${BASE_URL}/v1/website`, {
            url : "chetankumar.me"
        })
        expect(false, "Website shouldn't be created if no Auth").toBe(true)
        } catch (error: any) {
          expect(error.response.status).toBe(401)
        }
    })
}) 

describe("GET /website/status/:websiteId", ()=>{
  it("Returns 401 when website is not found", async()=>{
  try {
    await axios.get(`${BASE_URL}/v1/website/status/non-existent-id`, {
      headers: {
        Authorization : `Bearer ${jwt}`
      }
    })
    expect(false, "Request should have failed").toBe(true)
  } catch (error: any) {
    expect(error.response.status).toBe(401)
    expect(error.response.data.message).toBe("Website details not available")
  }
  })

  it("Returns 401 when AuthHeader is not provided", async()=>{
  try {
    await axios.get(`${BASE_URL}/v1/website/status/${websiteId}`, {
      headers: {}
    })
    expect(false, "Request should have failed if no Auth header").toBe(true)
  } catch (error: any) {
    expect(error.response.status).toBe(401)
  }
  })

  it("Returns website status when valid websiteId and AuthHeader are provided", async()=>{
    const response = await axios.get(`${BASE_URL}/v1/website/status/${websiteId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
    expect(response.status).toBe(200)
    expect(response.data.website).toBeDefined()
    expect(response.data.website.id).toBe(websiteId)
  })

})

describe("Should be able to get all websites", ()=>{
  let jwt2: String, userId2: String
  beforeAll(async()=>{
    const data = await createUser()
    jwt2 = data.jwt,
    userId2 =  data.id
  })

  it("Can fetch its own set of websites", async()=>{
   await axios.post(`${BASE_URL}/v1/website`, {
      url : "chetankumar.me"
    }, {
    headers: {
      Authorization: `Bearer ${jwt2}`
    }
    })

    await axios.post(`${BASE_URL}/v1/website`, {
      url : "x.com"
    }, {
    headers: {
      Authorization: `Bearer ${jwt2}`
    }
    })

      const response = await axios.get(`${BASE_URL}/v1/websites`,{
        headers: {
          Authorization: `Bearer ${jwt2}` 
        }
      })

      expect( response.data.websites.length == 2, "Incorrect number of websites created")
  })
})

})