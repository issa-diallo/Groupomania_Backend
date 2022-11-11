# Api Rest with node & express

The project consists in building an internal social network for employees. The aim of this tool is to facilitate interactions between colleagues.

- Frontend is available is: https://github.com/issa-diallo/Groupomania_frontend
- Admin is available when the server is running: http://localhost:3000/admin
  > **Note:** the admin username and password are automatically generated. You will find the information in the .env.example file

## Url

Add swagger here:

## Install && Run

### Option 1

System dependencies:

- to install [Node.js](https://nodejs.org/en/)
- to install [yarn](https://yarnpkg.com/)

Run:

```sh
yarn install
yarn dev
```

### Option 2

System dependencies:

- to install [docker](https://www.docker.com/)
- to install [docker-compose](https://docs.docker.com/compose/install/)

Run:

```sh
docker-compose build
docker-compose up
```

## :test_tube: Test

```
yarn test
```

## :rotating_light: Linting

```sh
yarn format
yarn lint

```

## Tech stack

- [express](https://expressjs.com/)
- [sequelize](https://sequelize.org/docs/v6/getting-started/#installing)
- [sequelize-typescript](https://www.npmjs.com/package/sequelize-typescript#model-association)
- [jest](https://jestjs.io/)
- [JWT](https://github.com/auth0/node-jsonwebtoken)
- [Multer](https://github.com/expressjs/multer)
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- [CORS](https://github.com/expressjs/cors)
- [AdminJs](https://docs.adminjs.co/installation/getting-started)
