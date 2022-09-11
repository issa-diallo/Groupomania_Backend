import app from '../app'
import request from 'supertest'
import User from '../models/user'
import { createUser } from '../controllers/authController'

beforeEach(() => User.destroy({ truncate: true }))

const login = (email: string, password: string) =>
  request(app).post('/api/v1/users/login').send({
    email,
    password,
  })

describe('User API', () => {
  const user = {
    pseudo: 'user01210',
    email: 'user1@mail.com',
    password: 'P4ssword',
  }
  let dbUser: User
  beforeEach(async () => {
    dbUser = await createUser(user.pseudo, user.email, user.password)
  })

  test('User not authenticate should return 401 --> GET /api/v1/users/', async () => {
    const response = await request(app).get('/api/v1/users/')
    expect(response.status).toBe(401)
  })

  test('should return 401 if user match not with middleware ', async () => {
    const response = await request(app).get('/api/v1/users/99999')
    expect(response.status).toBe(401)
  })

  test('should return a array users --> GET /api/v1/users/', async () => {
    const loginUser = await login(user.email, user.password)
    const cookies = loginUser.headers['set-cookie']

    const response = await request(app)
      .get('/api/v1/users/')
      .set('Cookie', cookies)

    expect(response.status).toBe(200)
    expect(response.body).toEqual([
      {
        id: dbUser.id,
        pseudo: expect.any(String),
        email: dbUser.email,
        picture: expect.any(String),
        bio: null,
        followers: null,
        following: null,
        likes: null,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    ])
  })

  test('should return only a user --> GET /api/v1/users/:id', async () => {
    const loginUser = await login(user.email, user.password)
    const cookies = loginUser.headers['set-cookie']

    const response = await request(app)
      .get('/api/v1/users/1')
      .set('Cookie', cookies)

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      id: dbUser.id,
      pseudo: expect.any(String),
      email: dbUser.email,
      picture: expect.any(String),
      bio: null,
      followers: null,
      following: null,
      likes: null,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    })
  })

  test('should updated a user in DB --> PUT /api/v1/users/id', async () => {
    const loginUser = await login(user.email, user.password)
    const cookies = loginUser.headers['set-cookie']

    const userList = await User.findAll()
    expect(userList.length).toBe(1)

    const response = await request(app)
      .put('/api/v1/users/1')
      .set('Cookie', cookies)
      .send({
        email: 'user10@mail.com',
      })

    expect(response.body).toEqual({
      id: expect.any(Number),
      pseudo: expect.any(String),
      email: 'user10@mail.com',
      picture: expect.any(String),
      bio: null,
      followers: null,
      following: null,
      likes: null,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    })
  })

  test('should deleted a user in DB --> DELETE /api/v1/users/id', async () => {
    const loginUser = await login(user.email, user.password)
    const cookies = loginUser.headers['set-cookie']

    const response = await request(app)
      .delete('/api/v1/users/1')
      .set('Cookie', cookies)
    expect(response.status).toBe(204)

    const userList = await User.findAll()
    expect(userList.length).toBe(0)
  })
})
