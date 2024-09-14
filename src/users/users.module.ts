import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './service/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';

// repository
import { registerUsers } from 'src/typeorm/entities/Register-User';
import { Profile } from 'src/typeorm/entities/users-profile';
import { UsersPosts } from 'src/typeorm/entities/users-posts';

@Module({
  imports:[TypeOrmModule.forFeature([registerUsers , Profile , UsersPosts])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
