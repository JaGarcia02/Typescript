import { JwtPayload } from './jwt-Payload.types';

export type JwtPayloadWithRt = JwtPayload & { refreshToken: string };
