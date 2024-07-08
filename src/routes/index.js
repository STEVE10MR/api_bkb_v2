import express from "express";
import userRoute from "./userRoute.js";
import authRoute from "./authRoute.js";
import classRoute from "./classRoute.js";
import courseRoute from "./courseRoute.js";
import deviceRoute from "./deviceRoute.js";
import studentRoute from "./studentRoute.js";
import prototypeRoute from "./prototypeRoute.js";
const route = express.Router()

route.use("/auth",authRoute)
route.use("/prototype",prototypeRoute)
route.use("/clase",classRoute)
route.use("/curso",courseRoute)
route.use("/dispositivo",deviceRoute)
route.use("/estudiante",studentRoute)
route.use("/usuario",userRoute)

export default route