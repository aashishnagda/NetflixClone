import express from "express";
import { protect } from "../middleware/authmiddleware.js"; //protect is usually a JWT verification middleware.

const router = express.Router();

router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
    userId: req.userId
  });
});

export default router;
//This route ensures that only authenticated users can access the profile section. 
// It uses a middleware called protect to verify the user's JWT token. 
// If the token is valid, the request proceeds to the route handler. 
// If not, access is denied with an unauthorized response