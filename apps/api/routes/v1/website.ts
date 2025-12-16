
import { prismaClient } from "db/client"
import { Router } from "express";
import { AuthMiddleware } from "../../middlewares/AuthMiddleware";

const router = Router()

router.post("/", AuthMiddleware, async (req, res) => {
  const url = req.body.url;
  const userId = (req as any).userId;
  if (!url || !userId) {
    res.status(400).json({
      message: "URL or UserId not provided"
    })
    return
  }

  try {
    const website = await prismaClient.website.create({
      data: {
        url: url,
        user_id: userId
      }
    })
    res.json({
      id: website.id
    })
  } catch (error) {
    res.status(400).send({
      error
    })
  }


})



router.get("/status/:websiteId", AuthMiddleware, async (req, res) => {
  try {
    const website = await prismaClient.website.findFirst({
      where: {
        user_id: req.userId,
        id: req.params.websiteId
      },
      include: {
        ticks: {
          orderBy: [{
            createdAt: "desc"
          }],
          take: 1
        }
      }
    })

    if (!website) {
      res.status(401).json({
        message: "Website details not available"
      })
      return
    }

    res.json({
      website
    })
  } catch (error) {
    res.status(400).json({
      error
    })
  }

})

export default router