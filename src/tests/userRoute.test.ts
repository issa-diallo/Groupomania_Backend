import app from '../app'
import request from 'supertest'
import User from '../models/user'

// cleaning the table before each test
beforeEach(() => {
  return User.destroy({ truncate: true })
})

describe('User Registration', () => {
  const postValidUser = () => {
    return request(app).post('/api/v1/users/register').send({
      email: 'user1@mail.com',
      password: 'P4ssword',
    })
  }

  test('should returns 201 when signup request is valid', async () => {
    const response = await postValidUser()
    expect(response.status).toBe(201)
  })

  test('should success message when signup request is valid', async () => {
    const response = await postValidUser()
    expect(response.body.message).toBe('User created')
  })

  test('save the user to database', async () => {
    await postValidUser()
    const userList = await User.findAll()
    expect(userList.length).toBe(1)
  })

  test('save the email to database', async () => {
    await postValidUser()
    const userList = await User.findAll()
    const savedUser = userList[0]
    expect(savedUser.email).toBe('user1@mail.com')
  })

  test('hashes the password in database', async () => {
    await postValidUser()
    const userList = await User.findAll()
    const savedUser = userList[0]
    expect(savedUser.password).not.toBe('P4ssword')
  })

  test('should return the property user', async () => {
    const response = await postValidUser()
    expect(response.body).toHaveProperty('user')
  })
})
