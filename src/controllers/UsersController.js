const knex = require("../database/knex");
const {hash, compare} = require("bcryptjs");
const AppError = require("../utils/AppError");

class UsersController {
   async create(request, response) {
      const { name, email, password } = request.body;

      const checkUserExists = await knex("users").where({ email });

      const checkEmail = checkUserExists.map( item => item.email === email );

      if (checkEmail[0]) {
         throw new AppError("Este E-mail já está sendo utilizado!");
      }

      const hashedPassword = await hash(password, 8);

      await knex("users").insert({
         name,
         email,
         password: hashedPassword
      });

      return response.status(201).json();
   }

   async update(request, response) {
      const { name, email, password } = request.body;
      const { id } = request.params;

      const user = await knex("users").where({ id });

      if (user.length === 0) {
         throw new AppError("Usuário não encontrado!");
      }

      user[0].name = name ?? user[0].name;
      user[0].email = email ?? user[0].email;
      user[0].password = await hash(password, 8);

      await knex("users").update({ 
         name: user[0].name, email: user[0].email, password: user[0].password 
      }).where({ id });

      return response.status(200).json();
   }

   async show(request, response) {
      const { id } = request.params;
      
      const user = await knex("users").where({ id });

      return response.status(200).json(user);
   }

   async index(request, response) {

      let users = await knex("users");

      users = users.map(user => {
         return {
            id: user.id,
            name: user.name,
            email: user.email
         }
      });

      return response.status(200).json(users);
   }
}

module.exports = UsersController;