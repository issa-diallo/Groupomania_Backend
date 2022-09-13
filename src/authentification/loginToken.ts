import jwt from 'jsonwebtoken'

export const createToken = (id: number) => {
  return jwt.sign({ userId: id }, process.env.TOKEN_SECRET, {
    expiresIn: 60 * 60 * 24 * 1000,
  })
}
