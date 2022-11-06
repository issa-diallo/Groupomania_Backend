import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  HasMany,
  AllowNull,
} from 'sequelize-typescript'
import Comment from './comment'
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

  @HasMany(() => Comment)
  comments: Comment[]
}

export default Post
