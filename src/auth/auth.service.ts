import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginForm } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jtwService: JwtService,
  ) {}
  async login(loginForm: LoginForm) {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .addSelect('user.password')
        .leftJoinAndSelect('user.role', 'role')
        .leftJoinAndSelect('role.permissions', 'permissions')
        .where('user.email = :email', { email: loginForm.email })
        .getOne();

      if (!user) throw new HttpException('Credenciales invalidas', 401);

      const isMatch = await bcrypt.compare(loginForm.password, user.password);

      if (!isMatch) {
        throw new HttpException('Credenciales invalidas', 401);
      }

      const payload = {
        issuer: user.id,
        user_name: `${user.name} ${user.last_name} ${user.last_mother_name}`,
        role: user.role.name,
        permissions: user.role.permissions.map((e) => e.name),
      };

      const token = this.jtwService.signAsync(payload);
      return token;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        console.log(error);
        throw new InternalServerErrorException('Error al validar el token');
      }
    }
  }
}
