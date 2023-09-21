import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthJwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(res);
    next();
  }
}
