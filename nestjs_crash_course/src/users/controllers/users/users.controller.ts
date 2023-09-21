import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

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

  @Post()
  createUser(@Req() req: Request, @Res() res: Response) {
    console.log(req.body);
    res.send('Created');
  }
}
