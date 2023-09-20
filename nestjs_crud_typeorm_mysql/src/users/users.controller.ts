import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/UpdateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private usesService: UsersService) {}
  @Get()
  getUsers() {
    return this.usesService.fetchUsers();
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usesService.createUsers(createUserDto);
  }

  @Put(':id')
  async upadteUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.usesService.editUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    await this.usesService.removeUser(id);
  }
}
