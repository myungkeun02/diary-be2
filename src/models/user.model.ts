import {
  Model,
  Column,
  Table,
  DataType,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import { Post } from './post.model';

@Table({
  tableName: 'users',
})
export class User extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    field: 'created_at',
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @Column({
    field: 'updated_at',
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  updatedAt: Date;

  @HasMany(() => Post)
  posts: Post[];
}
