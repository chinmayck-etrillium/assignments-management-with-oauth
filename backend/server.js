const express = require("express");
const dotenv = require("dotenv");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const app = express();
const db = require("./db");
const studentRoutes = require("./src/students/routes/students.route");
const adminRoutes = require("./src/admin/routes/admin.route");
const passport = require("passport");
const session = require("express-session");
dotenv.config();

require("./src/students/middlewares/oAuth");
require("./src/admin/middlewares/oAuth");

app.use(session({ secret: "dogs" }));
app.use(passport.session());

const port = 3000;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "GrowthX Assignment",
      version: "1.0.0",
      description: "Assignment submission portal",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: [
    "./src/admin/routes/admin.route.js",
    "./src/students/routes/students.route.js",
    "./src/swagger/admin.swagger.js",
    "./src/swagger/students.swagger.js",
  ],
};
const specs = swaggerJsDoc(options);

app.use(express.json());

db.connect_db();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use("/students", studentRoutes);
app.use("/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send(`
    <h3>Click Swagger UI to go to Api docs!</h3>
    <a href="/api-docs">Swagger UI</a> `);
});
