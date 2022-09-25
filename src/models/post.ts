import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript'
import User from './user'

@Table
class Post extends Model {
  @ForeignKey(() => User)
  @Column
  user_id: number

  @Column
  message: string

  @Column
  picture: string

  @Column
  video: string

  @BelongsTo(() => User)
  user: User
}

export default Post
