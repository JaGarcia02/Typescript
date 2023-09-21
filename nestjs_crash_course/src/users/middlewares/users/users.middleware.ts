import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class UsersMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Testing 123');
    console.log(req.headers.authorization);

    const { authorization } = req.headers;

    // This condition will detect if there are no token or auth in the headers
    // You can put your conditions here and put some other logic to verify the user

    if (!authorization) {
      throw new HttpException('No Authorization Token', HttpStatus.FORBIDDEN);
    }

    if (authorization === 'admin') {
      next();
    } else {
      throw new HttpException('User Not Authorized!', HttpStatus.FORBIDDEN);
    }
  }
}
