import {
  Table,
  Column,
  Model,
  Unique,
  NotEmpty,
  AllowNull,
  IsEmail,
  IsLowercase,
  Length,
  Default,
  HasMany,
} from 'sequelize-typescript'
import Comment from './comment'
import Post from './post'

@Table
class User extends Model {
  @Unique
  @NotEmpty
  @AllowNull(false)
  @Length({ min: 3, max: 9 })
  @Column
  pseudo: string

  @Unique
  @IsEmail
  @IsLowercase
  @NotEmpty
  @AllowNull(false)
  @Column
  email: string

  @NotEmpty
  @AllowNull(false)
  @Length({ min: 6 })
  @Column
  password: string

  @Default('./uploads/profil/random-user.png')
  @Column
  picture: string

  @Column
  bio: string

  @Default(false)
  @AllowNull(false)
  @Column
  isAdmin: boolean

  @HasMany(() => Post)
  posts: Post[]

  @HasMany(() => Comment)
  comments: Comment[]
}

export default User
