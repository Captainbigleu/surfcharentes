import { createParamDecorator, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { User } from '../users/entities/user.entity';

export const GetAdmin = createParamDecorator((_data, ctx: ExecutionContext): User => {
    const user: User = ctx.switchToHttp().getRequest().user;

    if (user.access_level < 1) {
        throw new ForbiddenException("Vous n'avez pas le niveau d'acces requis pour cette requête")
    }

    return user;
});