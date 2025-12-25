import { Router } from "express";
import { AuthMiddleware } from "../../middlewares/AuthMiddleware";
import { prismaClient } from "db/client";


const router = Router();

router.get("/", AuthMiddleware, async (req, res) => {
    try {
        const websites = await prismaClient.website.findMany({
            where: {
                user_id: req.userId
            }
        })

        res.json({
            websites
        })
    } catch (error) {
      res.status(404).json({
        error,
        message: "Something went wrong"
      })
    }
})

export default router