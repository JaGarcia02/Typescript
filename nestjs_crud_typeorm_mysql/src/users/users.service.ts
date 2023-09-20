import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../typeorm/entities/User';
import {
  CreateUserParams,
  UpdateUserParams,
  CreateUserProfileParams,
  CreateUserPostParams,
} from '../utils/types';
import { Profile } from 'src/typeorm/entities/Profile';
import { Post } from 'src/typeorm/entities/Posts';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}
  fetchUsers() {
    return this.userRepository.find({ relations: ['profile', 'posts'] });
  }

  createUsers(userDetail: CreateUserParams) {
    const newUser = this.userRepository.create({
      ...userDetail,
      createdAt: new Date(),
    });
    return this.userRepository.save(newUser);
  }

  editUser(id: number, userDetail: UpdateUserParams) {
    return this.userRepository.update({ id }, { ...userDetail });
  }

  removeUser(id: number) {
    return this.userRepository.delete({ id });
  }

  async addUserProfile(id: number, userDetail: CreateUserProfileParams) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException(
        'User not found. Cannot create profile!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newProfile = this.profileRepository.create(userDetail);
    const saveProfile = await this.profileRepository.save(newProfile);
    user.profile = saveProfile;
    return this.userRepository.save(user);
  }

  async addNewPost(id: number, postDetail: CreateUserPostParams) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException(
        'User not found. Cannot create post!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newPost = this.postRepository.create({ ...postDetail, user });
    return this.postRepository.save(newPost);
  }
}
