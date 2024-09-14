import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from './users-profile';
import { UsersPosts } from './users-posts';

@Entity({ name: 'users' })
export class registerUsers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  userName: string;

  @Column()
  password: string;

  @Column()
  createAt: Date;

  @Column({ nullable: true })
  googleStrategy: string;

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => UsersPosts, (post)=> post.user)
  posts: UsersPosts[]
}
