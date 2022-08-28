const { Router } = require("express");
const routes = Router();
const usersRoutes = require("./users.routes");
const movieNotesRoutes = require("./movieNotes.routes");
const movieTagsRoutes = require("./movieTags.routes");


routes.use("/users", usersRoutes);
routes.use("/movie-notes", movieNotesRoutes);
routes.use("/movie-tags", movieTagsRoutes);

module.exports = routes;

