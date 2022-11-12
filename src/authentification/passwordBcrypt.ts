import bcrypt from 'bcrypt'

export const hashPassword = (reqPassword: string) =>
  bcrypt.hash(reqPassword, 10)

export const verifyPassword = (reqPassword: string, passwordDB: string) =>
  bcrypt.compare(reqPassword, passwordDB)
