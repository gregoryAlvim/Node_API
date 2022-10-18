const knex = require("../database/knex");
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const AppError = require("../utils/AppError");
const authConfig = require("../config/auth");

class SessionsController {
   async create( request, response ) {
      const { email, password } = request.body;
      
      const user = await knex("users").where({email}).first();

      const passwordMatched = await compare(password, user.password);

      if (!user || !passwordMatched) {
         throw new AppError(" E-mail incorreto e/ou Senha incorreta! ");
      }
      const {secret, expiresIn} = authConfig.jwt;
      
      const token = sign({}, secret, {
         subject: String(user.id),
         expiresIn,
      });

      return response.json({user, token});
   }
}

module.exports = SessionsController;