import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';

// this will be the routes that you can modify or call the request like Post, Put, Patch, Delete and Get

@Controller('users') // <--- api or route, you can change this what ever you want
// this will be http://localhost:3001/users
export class UsersController {
  @Get('getUsers') // <-- you can name this route any naming you want
  //   to call this route this will be combined to the main route --> http://localhost:3001/users/getUsers
  getUsers() {
    return [
      {
        username: 'JaGarcia',
        email: 'ja02@email.com',
        password: 'abcd1234',
      },
    ];
  }

  @Get('getUserPost')
  //   http://localhost:3001/users/getUserPost
  getUserPost() {
    return [
      {
        username: 'JaGarcia',
        email: 'ja02@email.com',
        posts: [
          {
            id: 1,
            title: 'This is post 1.',
          },
          {
            id: 2,
            title: 'This is post 2.',
          },
          {
            id: 3,
            title: 'This is post 3.',
          },
        ],
      },
    ];
  }

  @Get('getUserPost/comments')
  // http://localhost:3001/users/getUserPost/comments
  getUserPostsComments() {
    return [
      {
        id: 1,
        title: 'This is post 1.',
        comments: [{ id: '1', comment: 'this is a comment' }],
      },
    ];
  }

  @Get(':id/:postId')
  getUserAndPostById(
    @Param('id', ParseIntPipe) id: number,
    @Param('id', ParseIntPipe) postId: number,
  ) {
    console.log(id, postId);
    return { id, postId };
  }

  //   querry Parameters
  @Get()
  getUserById(@Param(':id', ParseIntPipe) id: number) {
    console.log(id);
    return { id };
  }
  @Get()
  getUserByIdQuery(@Query('sortBy') sortBy: string) {
    console.log(sortBy);
    return [
      {
        username: 'JaGarcia',
        email: 'ja02@email.com',
        password: 'abcd1234',
      },
    ];
  }

  @Post('oldWay')
  //  http://localhost:3001/users/getUserPost/oldWay
  createUser(@Req() req: Request, @Res() res: Response) {
    console.log(req.body);
    res.send('Created');
  }

  @Post('newWay')
  @UsePipes(new ValidationPipe())
  createNewUser(@Body() userData: CreateUserDto) {
    console.log(userData);
    return {};
  }
}
