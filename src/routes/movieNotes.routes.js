const { Router } = require("express");
const MovieNotesController = require("../controllers/MovieNotesController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const movieNotesController = new MovieNotesController();
const movieNotesRoutes = Router();

movieNotesRoutes.use(ensureAuthenticated);

movieNotesRoutes.post("/", movieNotesController.create);
movieNotesRoutes.delete("/:id", movieNotesController.delete);
movieNotesRoutes.get("/", movieNotesController.index);
movieNotesRoutes.get("/:id", movieNotesController.show);

module.exports = movieNotesRoutes;