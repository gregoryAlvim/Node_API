const { Router } = require("express");
const UsersController = require("../controllers/UsersController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const usersController = new UsersController();
const usersRoutes = Router();

usersRoutes.post("/", usersController.create);
usersRoutes.get("/show-user", ensureAuthenticated, usersController.show);
usersRoutes.get("/", ensureAuthenticated, usersController.index);
usersRoutes.put("/", ensureAuthenticated, usersController.update);

module.exports = usersRoutes;
