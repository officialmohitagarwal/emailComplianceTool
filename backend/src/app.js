import "dotenv/config";

import express from "express";
import cors from "cors";

import analysisRoutes from "./routes/analysis.routes.js";

const app = express();

const PORT = process.env.PORT || 5002;




app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
    })
);




app.use(express.json());




app.get("/", (req, res) => {

    res.json({
        success: true,
        message: "server is working"
    });

});




app.use("/api", analysisRoutes);




app.listen(PORT, () => {

    console.log(
        `Server started running on PORT ${PORT}`
    );

});