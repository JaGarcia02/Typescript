import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../typeorm/entities/User';
import { CreateUserParams, UpdateUserParams } from '../utils/types';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  fetchUsers() {
    return this.userRepository.find();
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
}
