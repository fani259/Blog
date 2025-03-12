import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import mongoose from "mongoose"
import AuthRoute from "./routes/Authroute.js"
import UserRoute from "./routes/Userroute.js"
import CategoryRoute from "./routes/Categoryroute.js"
import BlogRoute from "./routes/Blogroute.js"
import CommentRoute from "./routes/Commentroute.js"
import BlogLikeRoute from "./routes/BlogLikeroute.js"

dotenv.config()

const PORT = process.env.PORT || 3000;

const app = express()


app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}))


app.use("/api/auth", AuthRoute)
app.use("/api/user", UserRoute)
app.use("/api/category", CategoryRoute)
app.use("/api/blog", BlogRoute)
app.use("/api/comment", CommentRoute)
app.use("/api/blog-like", BlogLikeRoute)



mongoose.connect(process.env.MONGODB_CONN, { dbName: "blog" })
    .then(() => console.log("Database Connected"))
    .catch(err => console.log("database connection failed", err))


app.listen(PORT, () => {
    console.log("server is running on port: ", PORT);
})


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})