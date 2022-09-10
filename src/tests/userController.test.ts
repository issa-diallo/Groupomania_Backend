import app from '../app'
import request from 'supertest'
import User from '../models/user'

beforeEach(() => User.destroy({ truncate: true }))

describe('User API', () => {
  test('should return a array users --> GET /api/v1/users/', async () => {
    let response = await request(app).get('/api/v1/users/')
    expect(response.status).toBe(200)
    expect(response.body).toEqual([])
    const newUser = await User.create({
      email: 'user1@mail.com',
      password: 'P4ssword',
    })
    response = await request(app).get('/api/v1/users/')
    expect(response.status).toBe(200)
    expect(response.body).toEqual([
      {
        createdAt: expect.any(String),
        email: newUser.email,
        id: newUser.id,
        updatedAt: expect.any(String),
      },
    ])
  })

  test('should return only a user --> GET /api/v1/users/:id', async () => {
    const newUser = await User.create({
      email: 'user1@mail.com',
      password: 'P4ssword',
    })
    const response = await request(app).get('/api/v1/users/1')
    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      createdAt: expect.any(String),
      email: newUser.email,
      id: newUser.id,
      updatedAt: expect.any(String),
    })
  })

  test('should return 404 if user not found', async () => {
    const response = await request(app).get('/api/v1/users/99999')
    expect(response.status).toBe(404)
    expect(response.body.message).toBe('User not Found')
  })

  test('should updated a user in DB --> PUT /api/v1/users/id', async () => {
    await User.create({
      email: 'user1@mail.com',
      password: 'P4ssword',
    })
    const response = await request(app).put('/api/v1/users/1').send({
      email: 'user10@mail.com',
    })
    const userList = await User.findAll()
    expect(userList.length).toBe(1)
    expect(response.body).toEqual({
      createdAt: expect.any(String),
      email: 'user10@mail.com',
      id: expect.any(Number),
      updatedAt: expect.any(String),
    })
  })

  test('should deleted a user in DB --> DELETE /api/v1/users/id', async () => {
    await User.create({
      email: 'user1@mail.com',
      password: 'P4ssword',
    })
    const response = await request(app).delete('/api/v1/users/1')
    expect(response.status).toBe(204)
    const userList = await User.findAll()
    expect(userList.length).toBe(0)
  })
})
