const knex = require("../database/knex");
const { compare } = require("bcryptjs");

const AppError = require("../utils/AppError");


class SessionsController {
   async create( request, response ) {
      const { email, password } = request.body;
      
      const user = await knex("users").where({email}).first();

      const passwordMatched = await compare(password, user.password);

      if (!user || !passwordMatched) {
         throw new AppError(" E-mail incorreto e/ou Senha incorreta! ");
      }

      return response.json(user);
   }
}

module.exports = SessionsController;