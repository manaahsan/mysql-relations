import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

// repositary
import { Profile } from 'src/typeorm/entities/users-profile';
import { registerUsers } from 'src/typeorm/entities/Register-User';

// types
import {
  registerParams,
  updateParams,
  UsersProfileParams,
} from 'src/lib/types';
import { UsersPosts } from 'src/typeorm/entities/users-posts';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(registerUsers)
    private userRepository: Repository<registerUsers>,
    @InjectRepository(Profile) private profieRepository: Repository<Profile>,
    @InjectRepository(UsersPosts)
    private PostsRepository: Repository<UsersPosts>,
  ) {}
  async createUsers(userDetails: registerParams) {
    const response = await this.userRepository.create({
      ...userDetails,
      createAt: new Date(),
    });
    return this.userRepository.save(response);
  }
  getUsers() {
    return this.userRepository.find({ relations: ['profile', 'posts'] });
  }
  updateUser(id: number, updateUserDetails: updateParams) {
    return this.userRepository.update({ id }, { ...updateUserDetails });
  }
  deleteUser(id: number) {
    return this.userRepository.delete({ id });
  }
  async createUsersProfile(id: number, userProfileDetails: UsersProfileParams) {
    const user = await this.userRepository.findOneBy({ id });
    console.log(user);

    if (!user) {
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    }

    const newProfile = this.profieRepository.create(userProfileDetails);
    const savedProfile = await this.profieRepository.save(newProfile);
    user.profile = savedProfile;
    return await this.userRepository.save(user);
  }

  getProfiles() {
    const profiles = this.profieRepository.find();
    return profiles;
  }

  async createUsersPost(id: number, userPostDetails: any) {
    const user = await this.userRepository.findOneBy({ id });
    console.log(user);

    if (!user) {
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    }

    const newPost = this.PostsRepository.create({ ...userPostDetails, user });
    return this.PostsRepository.save(newPost);
  }
}
