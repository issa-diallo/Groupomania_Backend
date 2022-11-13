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

@Table({
  indexes: [
    {
      name: 'UNIQUE_USER_LIKE',
      unique: true,
      fields: ['user_id', 'post_id'],
    },
  ],
})
class Like extends Model {
  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  user_id: number

  @ForeignKey(() => Post)
  @AllowNull(false)
  @Column
  post_id: number

  @BelongsTo(() => User)
  user: User

  @BelongsTo(() => Post)
  post: Post
}

export default Like
