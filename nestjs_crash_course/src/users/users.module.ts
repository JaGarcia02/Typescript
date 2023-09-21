import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { UsersMiddleware } from './middlewares/users/users.middleware';
import { SecondMiddleware } from './middlewares/second/second.middleware';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})

// middleware configuration
export class UsersModule implements NestModule {
  // for further explenation
  // https://www.youtube.com/watch?v=xzu3QXwo1BU&list=PL_cUvD4qzbkw-phjGK2qq0nQiG6gw1cKK&ab_channel=AnsontheDeveloper 1:09:13 / 1:40:06
  configure(consumer: MiddlewareConsumer) {
    // in this example this will work only in one specific route
    consumer
      .apply(UsersMiddleware)
      .forRoutes(
        {
          path: 'users',
          method: RequestMethod.GET,
        },
        {
          path: 'users/:id',
          method: RequestMethod.GET,
        },
      )
      .apply(SecondMiddleware)
      .forRoutes(
        {
          path: 'users',
          method: RequestMethod.GET,
        },
        {
          path: 'users/:id',
          method: RequestMethod.GET,
        },
      );
  }
}
