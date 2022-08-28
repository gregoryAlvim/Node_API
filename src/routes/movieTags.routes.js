const { Router } = require("express");
const MovieTagsController = require("../controllers/MovieTagsController");
const movieTagsController = new MovieTagsController();
const movieTagsRoutes = Router();

movieTagsRoutes.get("/:user_id", movieTagsController.index);

module.exports = movieTagsRoutes;