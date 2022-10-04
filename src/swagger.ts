import User from './models/user'
import userRouteDoc from './routes/userDoc'

const swaggerDocumentation = {
  openapi: '3.0.0',
  info: {
    title: 'Api Groupomania',
    description:
      'The project consists in building an internal social network for employees.The aim of this tool is to facilitate interactions between colleagues.',
    version: 'O.0.1',
    host: 'http://localhost:3000',
    basePath: 'api/v1',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'local dev',
    },
  ],
  tags: [
    {
      name: 'User',
      description: 'User routes',
    },
  ],
  paths: {
    ...userRouteDoc,
  },
}
export default swaggerDocumentation
