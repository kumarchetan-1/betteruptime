import "dotenv/config";
import  express from "express";
import v1Router from "./routes/v1"
import cors from "cors"

const app = express()
app.use(express.json())
app.use(cors())

app.use("/api/v1", v1Router)


app.listen(process.env.PORT || 3000, ()=>console.log("App running on PORT: ", process.env.PORT))