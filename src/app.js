
import express from "express";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";

import searchRoutes from "./routes/search.routes.js";
import swaggerSpec from "./swagger.js";

dotenv.config();

const app = express();

// Middleware to parse incoming JSON bodies
app.use(express.json());

/**
 * @swagger
 * /search/dishes:
 *   get:
 *     summary: Search restaurants by dish name (mandatory price range)
 *     description: Returns top 10 restaurants where the dish has been ordered the most, filtered by dish price range.
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Dish name to search (partial match supported)
 *         example: biryani
 *       - in: query
 *         name: minPrice
 *         required: true
 *         schema:
 *           type: number
 *         description: Minimum dish price (inclusive)
 *         example: 150
 *       - in: query
 *         name: maxPrice
 *         required: true
 *         schema:
 *           type: number
 *         description: Maximum dish price (inclusive)
 *         example: 300
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 restaurants:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       restaurantId: { type: integer, example: 5 }
 *                       restaurantName: { type: string, example: "Biryani Palace" }
 *                       city: { type: string, example: "Hyderabad" }
 *                       dishName: { type: string, example: "Chicken Biryani" }
 *                       dishPrice: { type: number, example: 180 }
 *                       orderCount: { type: integer, example: 70 }
 *       400:
 *         description: Missing/invalid query parameters
 *       500:
 *         description: Server error
 */


// All search routes are under /search
// so router path /dishes becomes: /search/dishes
app.use("/search", searchRoutes);


// Swagger UI endpoint
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Simple health check route
app.get("/", (req, res) => {
  res.send("OK");
});

// Start server on PORT from .env or fallback to 3000
const port = Number(process.env.PORT || 3000);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Swagger docs at http://localhost:${port}/docs`);
});
