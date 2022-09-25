import app from '../app'
import request from 'supertest'
import { createUser } from '../controllers/authController'
import { connexion, sequelize } from '../database/sequelizeDb'
import Post from '../models/post'
import Like from '../models/like'

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

describe('Like API', () => {
  const user = {
    pseudo: 'user01210',
    email: 'user1@mail.com',
    password: 'P4ssword',
  }
  beforeEach(async () => {
    await createUser(user.pseudo, user.email, user.password)
  })
  test('should add a like in db', async () => {
    const loginUser = await login(user.email, user.password)
    const cookies = loginUser.headers['set-cookie']

    const likeList = await Like.findAll()
    expect(likeList.length).toBe(0)

    await Post.create({
      user_id: 1,
      message: 'message post !!',
    })

    const response = await request(app)
      .post('/api/v1/post/like/1')
      .send({
        user_id: 1,
      })
      .set('Cookie', cookies)

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      id: expect.any(Number),
      user_id: 1,
      post_id: 1,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    })
  })

  test('should delete like in db', async () => {
    const loginUser = await login(user.email, user.password)
    const cookies = loginUser.headers['set-cookie']

    await Post.create({
      user_id: 1,
      message: 'message post !!',
    })
    await Like.create({
      user_id: 1,
      post_id: 1,
    })
    const likeList = await Like.findAll()
    expect(likeList.length).toBe(1)

    const response = await request(app)
      .delete('/api/v1/post/unlike/1')
      .send({
        user_id: 1,
      })
      .set('Cookie', cookies)
    expect(response.status).toBe(204)

    const userList = await Like.findAll()
    expect(userList.length).toBe(0)
  })
})
