import { Router } from "express"
import { AuthInput } from "../../zod-types/types"
import bcrypt from "bcrypt"
import { prismaClient } from "db/client"
import jwt  from "jsonwebtoken"
import env from "dotenv"

env.config()

const router =  Router()

router.post("/signup", async(req, res)=>{
    const data = AuthInput.safeParse(req.body.data)
    if (!data.data?.username || !data.data.password) {
       res.status(403).json({ message: "username and password are required"})
       return
    }

    const hashedPassword = await bcrypt.hash(data.data?.password, 10)
    if (!hashedPassword) {
        res.status(500).json({ message: "Failed to hash password"})
       return
    }

    const existingUser = await prismaClient.user.findFirst({
        where:{
            username: data.data.username
        }
    })

    if (existingUser) {
        res.status(401).json({
            message: "Username already exist in the db, please signin."
        })

        return
    }

    const user = await prismaClient.user.create({
        data:{
            name: data.data.name || "",
            username: data.data.username,
            password: hashedPassword
        }
    })

    res.json({
        userId: user.id
    })
})

router.post("/signin", async(req, res)=>{
    const data = AuthInput.safeParse(req.body.data)
    if (!data.success) {
       res.status(400).json({ message: "Invalid data format"})
       return
    }
    if (!data.data.username || !data.data.password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
  

    const user = await prismaClient.user.findFirst({
        where:{
            username: data.data.username
        }
    })
    if (!user) {
        res.status(403).json({ message: "User not found"})
        return
    }

    const isPasswordCorrect = await bcrypt.compare(data.data.password, user.password)
    if (!isPasswordCorrect) {
        res.status(401).json({
            message: "Incorrect password"
        })
        return
    }

    if (!process.env.JWT_SECRET) {
        res.status(500).json({
            message: "JWT_SECRET not configured"
        })
        return
    }
    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET)

    res.json({
        jwt: token
    })
})


export default router