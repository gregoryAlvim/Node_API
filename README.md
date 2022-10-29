# API - RocketMovies

<br/>

<h4 align="center">
   🚧 README em construção... 🚧
</h4>

<p align="center"> Backend da aplicação desenvolvido com JavaScript e Node.js </p>

#

<p align="center">
   <a href="#sobre">Sobre </a> •
   <a href="#tecnologias"> Tecnologias </a> •
   <a href="#apireference"> API Reference </a> •
   <a href="#autor"> Autor </a>
</p>

<br/>

## Sobre

O Rocket Movies é uma aplicação para salvar e gerenciar os filmes que você já assistiu. O Backend foi desenvolvido do zero utilizando JavaScript e Node.js.

## Tecnologias
- ``Knex``
- ``Node.js``
- ``Express``
- ``JavaScript``

## API Reference
<!-- --------------------------------------------------------------------- -->
### Route Sessions

#### Get user session

```http
  POST /sessions
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email`      | `string` | **Required**. E-mail to login |
| `password`      | `string` | **Required**. Password to login  |
<!-- --------------------------------------------------------------------- -->
### Routes Users

#### Get all users

```http
  GET /users
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
|  |  | Return all users |

#### Get user

```http
  GET /users/show-user
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| | | Return the authenticated user in the session |


#### Create user

```http
  POST /users
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. Name  |
| `email`      | `string` | **Required**. E-mail to login |
| `password`      | `string` | **Required**. Password to login  |

#### Update user

```http
  PUT /users
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | Name  |
| `email`      | `string` | E-mail |
| `password`      | `string` | **Required**. New password  |
| `old_password`      | `string` | **Required**. Old password  |
