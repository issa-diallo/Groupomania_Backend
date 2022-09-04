import jwt from 'jsonwebtoken'

export const createToken = (id: number) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: 3 * 24 * 60 * 60 * 1000,
  })
}
