import app from '../app'
import request from 'supertest'
import User from '../models/user'
import { passwordHashed } from '../authentification/passwordBcrypt'

// cleaning the table before each test
beforeEach(() => {
  return User.destroy({ truncate: true })
})

describe('User auth API', () => {
  describe('User Registration', () => {
    const postValidUser = () =>
      request(app).post('/api/v1/users/register').send({
        email: 'user1@mail.com',
        password: 'P4ssword',
      })

    test('validate user registration', async () => {
      // check if DB is empty
      let userList = await User.findAll()
      expect(userList.length).toBe(0)
      // Call our route
      const response = await postValidUser()
      // Check status - message - if property user exist
      expect(response.status).toBe(201)
      expect(response.body.message).toBe('User created')
      expect(response.body).toHaveProperty('user')

      // check if exist a user in DB
      userList = await User.findAll()
      expect(userList.length).toBe(1)

      // check email in DB
      const savedUser = userList[0]
      expect(savedUser.email).toBe('user1@mail.com')

      // makes sure the password is not plain text (it's hashed)
      expect(savedUser.password).not.toBe('P4ssword')
    })

    // test('should email unique', async () => {
    //   const newUser = await User.create({
    //     email: 'user1@mail.com',
    //     password: 'P4ssword',
    //   })
    //   // await expect(postValidUser()).rejects.toThrow()
    //   // expect(t).toThrow(TypeError)
    // })
  })
  describe('User Login', () => {
    const postLoginUser = () =>
      request(app).post('/api/v1/users/login').send({
        email: 'user1@mail.com',
        password: 'P4ssword',
      })
    test('should return 200 and cookies', async () => {
      let userList = await User.findAll()
      expect(userList.length).toBe(0)

      await User.create({
        email: 'user1@mail.com',
        password: await passwordHashed('P4ssword'),
      })

      userList = await User.findAll()
      expect(userList.length).toBe(1)

      const response = await postLoginUser()
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('user')
      expect(response.headers['set-cookie'][0].startsWith('jwt=')).toBeTruthy()
    })
  })
})
