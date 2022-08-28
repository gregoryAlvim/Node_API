const { Router } = require("express");
const MovieNotesController = require("../controllers/MovieNotesController");
const movieNotesController = new MovieNotesController();
const movieNotesRoutes = Router();

movieNotesRoutes.post("/:user_id", movieNotesController.create);
movieNotesRoutes.delete("/:id", movieNotesController.delete);
movieNotesRoutes.get("/", movieNotesController.index);
movieNotesRoutes.get("/:id", movieNotesController.show);

module.exports = movieNotesRoutes;