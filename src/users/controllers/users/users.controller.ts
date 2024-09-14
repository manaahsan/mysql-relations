import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from 'src/users/service/users/users.service';

// dto
import { registerDto } from 'src/users/dto/RegisterUser.dto';
import { UsersProfileDto } from 'src/users/dto/users-profiles.dto';
import { UsersPostsDto } from 'src/users/dto/users-posts.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post()
  RegisterUser(@Body() registerUser: registerDto) {
    this.userService.createUsers(registerUser);
  }

  @Get()
  async fetchUsers() {
    const response = await this.userService.getUsers();
    return response;
  }

  @Patch(':id')
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUser: registerDto,
  ) {
    await this.userService.updateUser(id, updateUser);
  }

  @Delete(':id')
  deleteUserById(@Param('id', ParseIntPipe) id: number) {
    this.userService.deleteUser(id);
  }

  @Post('/profiles/:id')
  usersProfiles(
    @Param('id', ParseIntPipe) id: number,
    @Body() userProfileDto: UsersProfileDto,
  ) {
    return this.userService.createUsersProfile(id, userProfileDto);
  }

  @Get('profiles')
  async fetchProfiles() {
    await this.userService.getProfiles();
  }

  @Post('/post/:id')
  usersPosts(
    @Param('id', ParseIntPipe) id: number,
    @Body() userPostsDto: UsersPostsDto,
  ) {
    return this.userService.createUsersPost(id, userPostsDto);
  }
}
