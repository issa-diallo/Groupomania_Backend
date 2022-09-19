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
  DataType,
  Default,
} from 'sequelize-typescript'

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

  @Column(DataType.STRING)
  bio: string

  @Column(DataType.STRING)
  followers: [string]

  @Column(DataType.STRING)
  following: [string]

  @Column(DataType.STRING)
  likes: [string]

  @Default(false)
  @AllowNull(false)
  @Column
  isAdmin: boolean
}

export default User
