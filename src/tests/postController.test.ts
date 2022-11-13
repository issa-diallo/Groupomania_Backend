import app from '../app'
import request from 'supertest'
import { createUser } from '../controllers/authController'
import { connection, sequelize } from '../database/sequelizeDb'
import Post from '../models/post'

beforeAll(() => {
  // keep the test logs clean by silencing the application logs
  jest.spyOn(console, 'info').mockImplementation(() => undefined)
})
beforeEach(async () => {
  try {
    await connection()
    await sequelize.sync({ force: true })
  } catch (error) {
    console.error(error)
  }
})
// afterEach(async () => {
//   try {
//     sequelize.close()
//   } catch (error) {
//     console.error(error)
//   }
// })

const login = (email: string, password: string) =>
  request(app).post('/api/v1/users/login').send({
    email,
    password,
  })

describe('Post API', () => {
  const user = {
    pseudo: 'user01210',
    email: 'user1@mail.com',
    password: 'P4ssword',
  }
  beforeEach(async () => {
    await createUser(user.pseudo, user.email, user.password)
  })
  test('should return a 201 & a object post --> post /api/v1/post/', async () => {
    const loginUser = await login(user.email, user.password)
    const token = loginUser.body.token

    const postList = await Post.findAll()
    expect(postList.length).toBe(0)

    const response = await request(app)
      .post('/api/v1/post')
      .send({
        user_id: 1,
        message: 'message post !!',
      })
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(201)
    expect(response.body).toEqual({
      id: expect.any(Number),
      user_id: 1,
      message: 'message post !!',
      updatedAt: expect.any(String),
      createdAt: expect.any(String),
    })
  })

  test('should return a array posts', async () => {
    const loginUser = await login(user.email, user.password)
    const token = loginUser.body.token

    const newPost = await Post.create({
      user_id: 1,
      message: 'message post !!',
    })

    const response = await request(app)
      .get('/api/v1/post/')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200)
    expect(response.body).toEqual([
      {
        id: expect.any(Number),
        user_id: newPost.user_id,
        message: newPost.message,
        picture: null,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    ])
  })

  test('should return only a post', async () => {
    const loginUser = await login(user.email, user.password)
    const token = loginUser.body.token

    const newPost = await Post.create({
      user_id: 1,
      message: 'message post !!',
    })

    const response = await request(app)
      .get('/api/v1/post/1')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      id: expect.any(Number),
      user_id: newPost.user_id,
      message: newPost.message,
      picture: null,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    })
  })

  test('should updated a post in DB', async () => {
    const loginUser = await login(user.email, user.password)
    const token = loginUser.body.token

    const newPost = await Post.create({
      user_id: 1,
      message: 'message post !!',
    })

    const userList = await Post.findAll()
    expect(userList.length).toBe(1)

    const response = await request(app)
      .put('/api/v1/post/1')
      .set('Authorization', `Bearer ${token}`)
      .send({
        user_id: 1,
        message: 'deuxième post modifié!!',
      })

    expect(response.body).toEqual({
      id: expect.any(Number),
      user_id: newPost.user_id,
      message: 'deuxième post modifié!!',
      picture: null,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    })
  })

  test('should deleted a post in DB', async () => {
    const loginUser = await login(user.email, user.password)
    const token = loginUser.body.token

    await Post.create({
      user_id: 1,
      message: 'message post !!',
    })

    const response = await request(app)
      .delete('/api/v1/post/1')
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(204)

    const userList = await Post.findAll()
    expect(userList.length).toBe(0)
  })
})
