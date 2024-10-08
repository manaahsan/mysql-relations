import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users_profiles' })
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;
}
