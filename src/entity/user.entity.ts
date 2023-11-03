import { Entity, Column, PrimaryGeneratedColumn, Generated, OneToMany } from 'typeorm';
import { Actions } from './actions.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  fio: string;

  @Column()
  @Generated("uuid")
  apiToken: string;

  @OneToMany(() => Actions, (action) => action.user)
  actions: Actions[]
}