import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { JWTPayload } from 'src/dto/claims.dto';
import { Permisssions } from '../dto/decorators/permission.decorator';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const permissions = this.reflector.getAllAndOverride<string[]>(
      Permisssions,
      [context.getHandler(), context.getClass()],
    );

    if (!permissions || permissions.length === 0) {
      return true;
    }

    const user = request['payload'] as JWTPayload;

    if (!user) {
      throw new UnauthorizedException('Sesion invalida');
    }
    const hasPermissions = permissions.every((permission) =>
      user.permissions.includes(permission),
    );

    if (!hasPermissions) {
      throw new ForbiddenException(
        'El usuario no tiene los permisos necesarios para realizar esta accion',
      );
    }
    return true;
  }
}
