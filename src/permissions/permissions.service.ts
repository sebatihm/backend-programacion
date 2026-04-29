import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { error } from 'console';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}
  async create(createPermissionDto: CreatePermissionDto) {
    try {
      const permission =
        await this.permissionRepository.save(createPermissionDto);
      return {
        message: 'Permission created succesfully',
        data: permission,
      };
    } catch (error) {
      throw new HttpException(
        'Something went wrong creating the permission',
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }

  async findAll() {
    try {
      const permissions = await this.permissionRepository.find();
      return {
        message: 'Permissions',
        data: permissions,
      };
    } catch (error) {
      throw new HttpException(
        'Something went wrong obtaining the permissions',
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }

  async findOne(id: number) {
    try {
      const permissions = await this.permissionRepository.findOneBy({ id });
      return {
        message: 'Permissions',
        data: permissions,
      };
    } catch (error) {
      throw new HttpException(
        'Something went wrong obtaining the permission',
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto) {
    try {
      const itExists = await this.permissionRepository.exists({
        where: { id },
      });

      if (!itExists) throw new HttpException('Permission Not Found', 404);

      const updatedPermission = await this.permissionRepository.update(
        id,
        updatePermissionDto,
      );

      if (updatedPermission.affected === 0) throw new error();
      const permission = await this.permissionRepository.findOneBy({ id });

      if (!itExists) throw new HttpException('Permission Not Found', 404);
      return {
        message: 'Permission updated succesfully',
        data: permission,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;

      throw new HttpException(
        'Something went wrong updating the permission',
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }

  async remove(id: number) {
    try {
      const itExists = await this.permissionRepository.exists({
        where: { id },
      });

      if (!itExists) throw new HttpException('Permission Not Found', 404);
      await this.permissionRepository.delete(id);

      return {
        message: 'Permission deleted succesfully',
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;

      throw new HttpException(
        'Something went wrong deleting the permission',
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }
}
