import app from '../app'
import request from 'supertest'
import { createUser } from '../controllers/authController'
import { connexion, sequelize } from '../database/sequelizeDb'
import Post from '../models/post'
import Comment from '../models/comment'
import User from '../models/user'

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

describe('Comment API', () => {
  const user = {
    pseudo: 'user01210',
    email: 'user1@mail.com',
    password: 'P4ssword',
  }
  let dbUser: User
  beforeEach(async () => {
    dbUser = await createUser(user.pseudo, user.email, user.password)
  })
  test('should create a object Comment', async () => {
    const loginUser = await login(user.email, user.password)
    const token = loginUser.body.token

    const CommentList = await Comment.findAll()
    expect(CommentList.length).toBe(0)

    await Post.create({
      user_id: 1,
      message: 'message post !!',
    })

    const response = await request(app)
      .post('/api/v1/comments/1')
      .send({
        user_id: 1,
        text: "commentaire d'un post !!",
      })
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(201)
    expect(response.body).toEqual({
      id: expect.any(Number),
      user_id: 1,
      post_id: 1,
      text: "commentaire d'un post !!",
      updatedAt: expect.any(String),
      createdAt: expect.any(String),
    })
  })

  test('should return a array Comments', async () => {
    const loginUser = await login(user.email, user.password)
    const token = loginUser.body.token

    const post = await Post.create({
      user_id: dbUser.id,
      message: 'message post !!',
    })

    await Comment.create({
      user_id: dbUser.id,
      post_id: post.id,
      text: "commentaire d'un post !!",
    })

    const CommentList = await Comment.findAll()
    expect(CommentList.length).toBe(1)

    const response = await request(app)
      .get('/api/v1/comments')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200)
    expect(response.body).toEqual([
      {
        id: expect.any(Number),
        user_id: 1,
        post_id: 1,
        text: "commentaire d'un post !!",
        updatedAt: expect.any(String),
        createdAt: expect.any(String),
      },
    ])
  })

  test('should updated a Comment in DB', async () => {
    const loginUser = await login(user.email, user.password)
    const token = loginUser.body.token

    await Post.create({
      user_id: 1,
      message: 'message post !!',
    })

    await Comment.create({
      user_id: 1,
      post_id: 1,
      text: "commentaire d'un post !!",
    })

    const userList = await Comment.findAll()
    expect(userList.length).toBe(1)

    const response = await request(app)
      .put('/api/v1/comments/1')
      .set('Authorization', `Bearer ${token}`)
      .send({
        text: "commentaire d'un post !!",
      })

    expect(response.body).toEqual({
      id: expect.any(Number),
      user_id: 1,
      post_id: 1,
      text: "commentaire d'un post !!",
      updatedAt: expect.any(String),
      createdAt: expect.any(String),
    })
  })

  test('should deleted a Comment in DB', async () => {
    const loginUser = await login(user.email, user.password)
    const token = loginUser.body.token

    await Post.create({
      user_id: 1,
      message: 'message post !!',
    })

    await Comment.create({
      user_id: 1,
      post_id: 1,
      text: "commentaire d'un post !!",
    })

    const response = await request(app)
      .delete('/api/v1/comments/1')
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(204)

    const userList = await Comment.findAll()
    expect(userList.length).toBe(0)
  })
})
