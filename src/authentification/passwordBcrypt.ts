import bcrypt from 'bcrypt'

export const passwordHashed = (reqPassword: string) =>
  bcrypt.hash(reqPassword, 10)

export const compareHashed = (reqPassword: string, passwordDB: string) =>
  bcrypt.compare(reqPassword, passwordDB)
