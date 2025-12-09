import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Restaurant Dish Search API",
      version: "1.0.0",
    },
    servers: [{ url: "/" }],
  },
  apis: ["./src/**/*.js"],
};

export default swaggerJSDoc(options);
