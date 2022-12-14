import app from '../app'
import request from 'supertest'
import { createUser } from '../controllers/authController'
import { connection, sequelize } from '../database/sequelizeDb'
import Post from '../models/post'
import Like from '../models/like'

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
    const token = loginUser.body.token

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
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(201)
    expect(response.body).toEqual({
      message: expect.any(String),
      count: expect.any(Number),
    })
  })

  test('should delete like in db', async () => {
    const loginUser = await login(user.email, user.password)
    const token = loginUser.body.token

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
      .post('/api/v1/post/unlike/1')
      .send({
        user_id: 1,
      })
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(201)

    const userList = await Like.findAll()
    expect(userList.length).toBe(0)
  })
})
