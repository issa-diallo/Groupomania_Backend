import { Request } from 'express'
export interface TokenInterface {
  userId: number
}

export interface RequestAuth extends Request {
  auth: TokenInterface
}
