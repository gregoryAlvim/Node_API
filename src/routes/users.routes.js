const { Router } = require("express");
const multer = require("multer");

const UserAvatarController = require("../controllers/UserAvatarController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const UsersController = require("../controllers/UsersController");
const uploadConfig = require("../config/upload");

const userAvatarController = new UserAvatarController();
const usersController = new UsersController();
const upload = multer(uploadConfig.MULTER);
const usersRoutes = Router();


usersRoutes.post("/", usersController.create);
usersRoutes.get("/show-user", ensureAuthenticated, usersController.show);
usersRoutes.get("/", ensureAuthenticated, usersController.index);
usersRoutes.put("/", ensureAuthenticated, usersController.update);
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update);

module.exports = usersRoutes;
