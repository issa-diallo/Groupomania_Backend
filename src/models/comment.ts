import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  AllowNull,
} from 'sequelize-typescript'
import Post from './post'
import User from './user'

@Table
class Comment extends Model {
  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  user_id: number

  @ForeignKey(() => Post)
  @AllowNull(false)
  @Column
  post_id: number

  @Column
  text: string

  @BelongsTo(() => User)
  user: User

  @BelongsTo(() => Post)
  post: Post
}

export default Comment
