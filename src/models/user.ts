import {
  Table,
  Column,
  Model,
  Unique,
  NotEmpty,
  AllowNull,
  DefaultScope,
} from 'sequelize-typescript'

@DefaultScope(() => ({
  attributes: ['id', 'email', 'createdAt', 'updatedAt'],
}))
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
