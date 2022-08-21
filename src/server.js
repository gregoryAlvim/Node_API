require("express-async-errors");

const sqliteConnection = require("./database/sqlite");
const AppError = require("./utils/AppError");
const routes = require("./routes");

const express = require("express");

const application = express();
const PORT = 3333;

sqliteConnection();

application.use(express.json());
application.use(routes);

application.use( (error, request, response, next) => {
   if (error instanceof AppError) {
      return response.status(error.statusCode).json({
         status: "error",
         message: error.message
      });
   }

   console.error(error);

   return  response.status(500).json({
      status: "error",
      message: "Internal Server Error!"
   });
});

application.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));