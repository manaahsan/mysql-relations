import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { registerUsers } from './Register-User';

@Entity({ name: 'posts' })
export class UsersPosts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(()=> registerUsers, (users) => users.posts)
  user: registerUsers
}
