import  express from "express";
import v1Router from "./routes/v1"

const app = express()
app.use(express.json())
app.use("/routes/v1", v1Router)


app.post("/website", (req, res)=>{

})

app.get("/status/:websiteId", (req, res)=>{
    const websiteId = req.params.websiteId;

})


app.listen(process.env.PORT || 3000, ()=>console.log("App running on PORT: ", process.env.PORT))