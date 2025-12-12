
import { prismaClient } from "db/client"
import Router from "express";

const router = Router()

router.post("/website", async(req, res)=>{
  const url = req.body.url;
  if(!url){
    res.status(411).json({ 
      message: "URL not provided"
    })
  }

  const website =  await prismaClient.website.create({
    data: {
      url: url
    }
  })

  res.json({
    id: website.id
  })
})



router.get("/status/:websiteId", (req, res)=>{
    const websiteId = req.params.websiteId;

})

export default router