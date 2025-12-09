import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Restaurant Dish Search API",
      version: "1.0.0",
      description:
        "Search restaurants by dish name + price range, ranked by total orders of that dish.",
    },
    servers: [{ url: "http://localhost:3000" }],
  },

  apis: ["./src/**/*.js"],
};

export default swaggerJSDoc(options);
