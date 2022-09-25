import app from '../app'
import request from 'supertest'
import { createUser } from '../controllers/authController'
import { connexion, sequelize } from '../database/sequelizeDb'
import Post from '../models/post'

beforeEach(async () => {
  try {
    await connexion()
    await sequelize.sync({ force: true })
  } catch (error) {
    console.error(error)
  }
})
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
    const cookies = loginUser.headers['set-cookie']

    const postList = await Post.findAll()
    expect(postList.length).toBe(0)

    const response = await request(app)
      .post('/api/v1/post')
      .send({
        user_id: 1,
        message: 'message post !!',
      })
      .set('Cookie', cookies)
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
    const cookies = loginUser.headers['set-cookie']

    const newPost = await Post.create({
      user_id: 1,
      message: 'message post !!',
    })

    const response = await request(app)
      .get('/api/v1/post/')
      .set('Cookie', cookies)

    expect(response.status).toBe(200)
    expect(response.body).toEqual([
      {
        id: expect.any(Number),
        user_id: newPost.user_id,
        message: newPost.message,
        picture: null,
        video: null,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    ])
  })

  test('should return only a post', async () => {
    const loginUser = await login(user.email, user.password)
    const cookies = loginUser.headers['set-cookie']

    const newPost = await Post.create({
      user_id: 1,
      message: 'message post !!',
    })

    const response = await request(app)
      .get('/api/v1/post/1')
      .set('Cookie', cookies)

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      id: expect.any(Number),
      user_id: newPost.user_id,
      message: newPost.message,
      picture: null,
      video: null,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    })
  })

  test('should updated a post in DB', async () => {
    const loginUser = await login(user.email, user.password)
    const cookies = loginUser.headers['set-cookie']

    const newPost = await Post.create({
      user_id: 1,
      message: 'message post !!',
    })

    const userList = await Post.findAll()
    expect(userList.length).toBe(1)

    const response = await request(app)
      .put('/api/v1/post/1')
      .set('Cookie', cookies)
      .send({
        user_id: 1,
        message: 'deuxième post modifié!!',
      })

    expect(response.body).toEqual({
      id: expect.any(Number),
      user_id: newPost.user_id,
      message: 'deuxième post modifié!!',
      picture: null,
      video: null,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    })
  })

  test('should deleted a post in DB', async () => {
    const loginUser = await login(user.email, user.password)
    const cookies = loginUser.headers['set-cookie']

    await Post.create({
      user_id: 1,
      message: 'message post !!',
    })

    const response = await request(app)
      .delete('/api/v1/post/1')
      .set('Cookie', cookies)
    expect(response.status).toBe(204)

    const userList = await Post.findAll()
    expect(userList.length).toBe(0)
  })
})
