import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

// entity
import { registerUsers } from './typeorm/entities/Register-User';
import { UsersModule } from './users/users.module';
import { Profile } from './typeorm/entities/users-profile';
import { UsersPosts } from './typeorm/entities/users-posts';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'ahsan',
      database: 'nestjs_mysql',
      entities: [registerUsers, Profile, UsersPosts],
      synchronize: true,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
