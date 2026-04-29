import { HttpException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { In, Repository } from 'typeorm';
import { Permission } from 'src/roles/entities/permission.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,

    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permission>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const roleData = {
      name: createRoleDto.name,
    };

    const existingRole = await this.rolesRepository.findOne({
      where: { name: roleData.name },
    });
    if (existingRole) throw new HttpException('Nombre del rol duplicado', 400);

    try {
      const data = await this.rolesRepository.save(roleData);
      const permissions = await this.permissionsRepository.findBy({
        id: In(createRoleDto.permissions),
      });

      data.permissions = permissions;
      await this.rolesRepository.save(data);

      return {
        message: 'Rol creado exitosamente',
        data: data,
      };
    } catch (error) {
      throw new HttpException('Algo salio mal', 500, { cause: error });
    }
  }

  async findAll() {
    try {
      const data = await this.rolesRepository.find({
        relations: ['permissions'],
      });

      return {
        message: 'Datos recuperados exitosamente',
        data: data,
      };
    } catch (error) {
      throw new HttpException('Algo salio mal', 500, { cause: error });
    }
  }

  async findOne(id: number) {
    try {
      const existingRole = await this.rolesRepository.findOne({
        where: { id },
        relations: ['permissions'],
      });
      if (!existingRole) throw new HttpException('Rol no encontrado', 404);

      return {
        message: 'Rol encontrado',
        data: existingRole,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException('Algo salio mal', 500, { cause: error });
    }
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    try {
      const requestedRole = await this.rolesRepository.findOne({
        where: { id },
        relations: ['permissions'],
      });

      if (!requestedRole) throw new HttpException('Rol no encontrado', 404);

      if (updateRoleDto.permissions) {
        const permissions = await this.permissionsRepository.findBy({
          id: In(updateRoleDto.permissions),
        });

        requestedRole.permissions = permissions;
      }

      if (updateRoleDto.name) {
        requestedRole.name = updateRoleDto.name;
      }

      const updatedRole = await this.rolesRepository.save(requestedRole);

      if (!updatedRole)
        throw new HttpException('Error al actualizar el rol', 500);

      return {
        message: 'Rol actualizado exitosamente',
        data: requestedRole,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException('Algo salio mal', 500, { cause: error });
    }
  }

  async remove(id: number) {
    try {
      const exists = await this.rolesRepository.exists({ where: { id } });
      if (!exists) throw new HttpException('Rol no encontrado', 404);
      return this.rolesRepository.delete(id);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException('Algo salio mal', 500, { cause: error });
    }
  }
}
