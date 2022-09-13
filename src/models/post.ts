import {
  Table,
  Column,
  Model,
  DataType,
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

  @Column
  likers: string

  @BelongsTo(() => User)
  user: User
}

export default Post
