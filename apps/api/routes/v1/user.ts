import Router from "express"

const router =  Router()

router.post("/signup", (req, res)=>{
    const { name, email, password } = req.body
    // zod validation
    // bcrypt for encrypting the password

    res.json({
        userId: "alsdjfas"
    })
})

router.post("/signin", (req, res)=>{
    const { name, email, password } = req.body
    // zod validation
    // bcrypt for encrypting the password

    res.json({
        token: "jwttoken"
    })
})


export default router