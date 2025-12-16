import { Router } from "express"
import websiteRouter from "./website"
import userRouter from "./user"
const router = Router()

router.use("/user", userRouter)
router.use("/website", websiteRouter)

export default router;
