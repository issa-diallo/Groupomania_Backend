import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  HasMany,
  AllowNull,
} from 'sequelize-typescript'
import Like from './like'
import User from './user'

@Table
class Post extends Model {
  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  user_id: number

  @Column
  message: string

  @Column
  picture: string

  @BelongsTo(() => User)
  user: User

  @HasMany(() => Like)
  posts: Like[]
}

export default Post
