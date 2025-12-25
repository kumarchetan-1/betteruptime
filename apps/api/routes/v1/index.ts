import { Router } from "express"
import websiteRouter from "./website"
import websitesRouter from "./websites"
import userRouter from "./user"
const router = Router()

router.use("/user", userRouter)
router.use("/website", websiteRouter)
router.use("/websites", websitesRouter)

export default router;
