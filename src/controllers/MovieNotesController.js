const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class MovieNotesController {
   async create(request, response) {
      const { title, description, rating, tags } = request.body;
      const user_id = request.user.id;

      const note_id = await knex("movie_notes").insert({
         title,
         description,
         rating,
         user_id
      });

      const tagsInsert = tags.map( name => {
         return {
            note_id,
            name,
            user_id
         }
      });

      await knex("movie_tags").insert(tagsInsert);

      return response.status(201).json();
   }

   async delete(request, response) {
      const { id } = request.params;

      await knex("movie_notes").where({ id }).delete();

      return response.json({
         message: "Nota do filme deletada com sucesso!"
      });
   }

   async index(request, response) {
      const { title, tags } = request.query;
      const user_id = request.user.id;

      let notes;

      if (tags) {

         const filterTags = tags.split(',').map(tag => tag);

         notes = await knex("movie_tags")
         .select([
            "notes.id",
            "notes.title",
            "notes.user_id"
         ])
         .where("notes.user_id", user_id)
         .whereLike("notes.tile", `%${title}%`)
         .whereIn("name", filterTags)
         .innerJoin("notes", "notes.id", "movie_tags.note_id")
         .orderBy("notes.title");

      } else {

         notes = await knex("movie_notes")
         .where({ user_id })
         .whereLike("title", `%${title}%`)
         .orderBy("title");

      }

      const userTags = await knex("movie_tags").where({ user_id });

      const notesWithTags = notes.map(note => {
         const noteTags = userTags.filter( tag => tag.note_id === note.id );

         return {
            ...note,
            tags: noteTags
         }
      });
      
      if (notesWithTags.length === 0) {
         return response.json({
            message: " Nenhuma nota encontrada para este usuário! ",
         });
      }

      return response.json(notesWithTags);
   }

   async show(request, response) {
      const { id } = request.params;

      const note = await knex("movie_notes").where({ id });
      const tags = await knex("movie_tags").where({ note_id: id }).orderBy("name");

      return response.json({
         ...note,
         tags
      });
   }
}

module.exports = MovieNotesController;