import jwt from 'jsonwebtoken'

export const createToken = (id: number) => {
  return jwt.sign({ userId: id }, process.env.TOKEN_SECRET, {
    expiresIn: process.env.EXPIRE_IN,
  })
}
