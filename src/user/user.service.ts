import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Role)
    private roleRepository: Repository<Role>,

    private configService: ConfigService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const existingUserEmail = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });

      if (existingUserEmail)
        throw new HttpException('Correo actualmente en uso', 400);

      const saltRounds = this.configService.get<string>('SALT_ROUNDS') ?? '10';

      createUserDto.password = bcrypt.hashSync(
        createUserDto.password,
        parseInt(saltRounds),
      );

      const newUser = this.userRepository.create(createUserDto);

      const role = await this.roleRepository.findOne({
        where: { id: createUserDto.role_id },
        relations: ['permissions'],
      });

      if (!role) throw new HttpException('Rol no encontrado', 404);

      newUser.role = role;
      await this.userRepository.save(newUser);

      return {
        message: 'Usuario creado correctamente',
        data: newUser,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException('Error del servidor', 500, { cause: error });
      }
    }
  }

  async findAll() {
    try {
      const data = await this.userRepository.find();
      return {
        message: 'Lista de usuarios',
        data: data,
      };
    } catch (error) {
      throw new HttpException('Error al recuperar los usuarios', 500, {
        cause: error,
      });
    }
  }

  async findOne(id: number) {
    try {
      const requestedUser = await this.userRepository.findOne({
        where: { id },
      });
      if (!requestedUser) throw new HttpException('Usuario no encontrado', 404);
      return {
        message: 'Usuario encontrado',
        data: requestedUser,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException('Error del servidor', 500, { cause: error });
      }
    }
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const role_id = updateUserDto.role_id;
      delete updateUserDto.role_id;
      const requestedUser = await this.userRepository.findOne({
        where: { id },
        relations: ['role'],
      });

      if (!requestedUser) throw new HttpException('Usuario no encontrado', 404);

      Object.assign(requestedUser, updateUserDto);

      if (role_id) {
        const requestedRole = await this.roleRepository.findOne({
          where: { id: role_id },
          relations: ['permissions'],
        });

        if (!requestedRole)
          throw new HttpException('El rol solitado no fue encontrado', 404);

        requestedUser.role = requestedRole;
      }

      await this.userRepository.save(requestedUser);
      return {
        message: 'Usuario Actualizado',
        data: requestedUser,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException('Error del servidor', 500, { cause: error });
      }
    }
  }

  async remove(id: number) {
    try {
      const requestedUser = await this.userRepository.exists({ where: { id } });
      if (!requestedUser) throw new HttpException('Usuario no encontrado', 404);
      return await this.userRepository.delete(id);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException('Error al eliminar el usuario', 500, {
          cause: error,
        });
      }
    }
  }
}
