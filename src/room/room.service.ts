import { HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';
import { Schedule } from 'src/schedule/entities/schedule.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,

    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  async create(createRoomDto: CreateRoomDto) {
    try {
      const room = this.roomRepository.create(createRoomDto);
      const result = await this.roomRepository.save(room);
      return {
        message: 'Aula creada exitosamente',
        data: result,
      };
    } catch (error) {
      console.error(error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al crear la aula');
    }
  }

  async findAll() {
    try {
      const room = await this.roomRepository.find({
        relations: ['schedules'],
      });
      return {
        message: 'Lista de aulas obtenidas exitosamente',
        data: room,
      };
    } catch (error) {
      console.error(error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al obtener las aulas');
    }
  }

  async findOne(id: number) {
    try {
      const room = await this.roomRepository.findOneBy({ room_id: id });
      if (!room) {
        throw new NotFoundException('Aula no encontrada');
      }
      return {
        message: 'Aula encontrada',
        data: room,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al obtener la aula');
    }
  }

  async update(id: number, updateRoomDto: UpdateRoomDto) {
    try {
      const room = await this.roomRepository.update(id, updateRoomDto);
      if (room.affected === 0) {
        throw new NotFoundException('Aula no encontrada');
      }
      const updatedRoom = await this.roomRepository.findOneBy({ room_id: id });
      if (!updatedRoom) {
        throw new NotFoundException('Aula no encontrada');
      }
      Object.assign(updatedRoom, updateRoomDto);
      const result = await this.roomRepository.save(updatedRoom);
      return {
        message: `Aula ${updatedRoom.name} actualizada exitosamente`,
        data: result,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al actualizar la aula');
    }
  }

  async remove(id: number) {
    try {
      const room = await this.roomRepository.delete(id);
      if (room.affected === 0) {
        throw new NotFoundException('Aula no encontrada');
      } else {
        return {
          message: `Aula ${id} eliminada exitosamente`,
        };
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al eliminar la aula');
    }
  }
}
