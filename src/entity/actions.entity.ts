import { Entity, Column, PrimaryGeneratedColumn, Generated, ManyToOne } from 'typeorm';
import { User } from "./user.entity"

@Entity()
export class Actions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  action_time: number;

  @Column()
  request_result: number;

  @Column({nullable: true})
  temp_c: number;

  @ManyToOne(() => User, (user) => user.actions)
  user: User
}