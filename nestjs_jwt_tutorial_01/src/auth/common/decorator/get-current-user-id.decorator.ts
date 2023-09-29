import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { JwtPayload, JwtPayloadWithRt } from 'src/utils';

export const GetCurrentUserId = createParamDecorator(
  (
    data: keyof JwtPayloadWithRt | undefined,
    context: ExecutionContext,
  ): number => {
    const request = context.switchToHttp().getRequest();
    const user = request.user as JwtPayload;
    if (!data) {
      return request.user.id;
    }
    return user.id;
  },
);
