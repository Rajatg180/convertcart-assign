import { Router } from "express";
import { searchDishes } from "../controllers/search.controller.js";

const router = Router();

// GET /search/dishes -> handled by searchDishes controller function
router.get("/dishes", searchDishes);

export default router;