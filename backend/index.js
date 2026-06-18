
import express from "express";
import mongoose from "mongoose";  //ODM (Object Data Modeling) library for MongoDB.
import cors from "cors";          //Cross-Origin Resource Sharing.Allows frontend (different port/domain) to access backend.
import dotenv from "dotenv";        //To load environment variables from .env file.
import http from "http";          //To create an HTTP server.
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";

dotenv.config();         //Reads .env file and loads variables into:process.env

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDistPath = path.join(__dirname, "../frontend/dist");

const app = express();

/* ---------------- MIDDLEWARE ---------------- */
app.use(cors());  //Allows frontend (different port/domain) to access backend.
app.use(express.json());  //Allows backend to parse JSON data from frontend requests.

app.use("/api/auth", authRoutes);  //API routes for authentication.
app.use("/api/user", userRoutes);  //API routes for user management.

/* ---------------- DB ---------------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

/* ---------------- STATIC FRONTEND ---------------- */
if (fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath));

  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(frontendDistPath, "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Backend running");
  });
}

const server = http.createServer(app);




const PORT = process.env.PORT || 5000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT} (LAN enabled)`);
});

//Middleware controls and processes requests before sending responses.
//I built the backend using Express and MongoDB. 
// I used middleware like CORS and express.json to handle cross-origin requests and parse JSON bodies.
// I organized routes into separate modules for authentication and user management. 
// I connected to MongoDB using Mongoose with environment variables for security. 
// Finally, I created an HTTP server that listens on port ${PORT} and enabled LAN access using 0.0.0.0.