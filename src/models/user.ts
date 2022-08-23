import {
  Table,
  Column,
  Model,
  Unique,
  NotEmpty,
  AllowNull,
} from 'sequelize-typescript'

@Table
class User extends Model {
  @Unique
  @NotEmpty
  @AllowNull(false)
  @Column
  email: string

  @NotEmpty
  @AllowNull(false)
  @Column
  password: string
}

export default User
