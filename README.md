# Api Rest with node & express
The project consists in building an internal social network for employees. The aim of this tool is to facilitate interactions between colleagues.

## Url
Add swagger here:

## Install && Run
### Option 1
System dependencies:
- [Node.js](https://nodejs.org/en/)
- [yarn](https://yarnpkg.com/)

Run:
```sh
yarn install
yarn dev
```
### Option 2
System dependencies:
- [docker](https://www.docker.com/)
- [docker-compose](https://docs.docker.com/compose/install/)

Run:
```sh
docker-compose build
docker-compose up
```

## :test_tube: Test
```
yarn test --watch --detectOpenHandles
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
