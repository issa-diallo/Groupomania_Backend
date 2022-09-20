import { Request } from 'express'

import User from '../../models/user'

export const getUser = async (req: Request) => {
  const paramsId = req.params.id

  const user: User = await User.findByPk(paramsId, {
    attributes: { exclude: ['password'] },
  })
  return user
}
