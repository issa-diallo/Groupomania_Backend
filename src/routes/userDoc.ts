const user = [
  {
    id: 1,
    pseudo: 'user1',
    email: 'user1@gmail.com',
    picture: './uploads/profil/random-user.png',
    bio: '',
    isAdmin: false,
    createdAt: '2022-10-04T11:08:33.000Z',
    updatedAt: '2022-10-04T11:08:33.000Z',
  },
]

const listUsers = {
  tags: ['User'],
  description: 'List all the users',
  cookies: 'jwt',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            example: {
              count: 1,
              user,
            },
          },
        },
      },
    },
  },
}

const userRouteDoc = {
  '/api/v1/users': {
    get: listUsers,
  },
}

export default userRouteDoc
