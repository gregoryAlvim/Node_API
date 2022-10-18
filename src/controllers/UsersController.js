const knex = require("../database/knex");
const {hash, compare} = require("bcryptjs");
const AppError = require("../utils/AppError");

class UsersController {
   async create(request, response) {
      const { name, email, password } = request.body;

      const checkUserExists = await knex("users").where({ email });
      const checkEmail = checkUserExists.find(( user ) => user.email === email);
      
      if (checkEmail) {
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
      const { name, email, password, old_password } = request.body;
      const user_id = request.user.id;

      const userData = await knex("users").where({ id: user_id });
      const user = userData.find(( user ) => user.id === Number(user_id));

      const userWithUpdatedEmailData = await knex("users").where({ email });
      const userWithUpdatedEmail = userWithUpdatedEmailData.find(( user ) => user.email === email);

      if (!user) {
         throw new AppError("Usuário não encontrado!");
      }

      if ( userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id ) {
         throw new AppError("Este E-mail já está sendo utilizado!");
      }

      if (password && !old_password) {
         throw new AppError("Você precisa informar a senha antiga para definir a nova senha!");
      }

      if (password && old_password) {
         const checkOldPassword = await compare(old_password, user.password);

         if (!checkOldPassword) {
            throw new AppError("A senha antiga não confere!");
         }

         user.password = await hash(password, 8);
      }

      user.name = name ?? user.name;
      user.email = email ?? user.email;

      await knex("users").update({ 
         name: user.name, email: user.email, password: user.password 
      }).where({ id: user_id });

      return response.status(200).json();
   }

   async show(request, response) {
      const user_id = request.user.id;
      
      const user = await knex("users").where({ id: user_id });
      const checkUserExists = user.find(( user ) => user.id === Number(user_id));
      
      if ( !checkUserExists ) {
         throw new AppError("Usuário não encontrado!");
      }

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