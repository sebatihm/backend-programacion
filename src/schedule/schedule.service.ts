import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from './entities/schedule.entity';
import { Repository } from 'typeorm';
import { Room } from 'src/room/entities/room.entity';

@Injectable()
export class ScheduleService {

  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,

    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}

  async create(createScheduleDto: CreateScheduleDto) {
    try {
      const roomExists = await this.roomRepository.findOne({ where: { room_id: createScheduleDto.room_id } });
      if (!roomExists) {
        throw new NotFoundException('Aula no encontrada');
      }
      const schedule = this.scheduleRepository.create({
        ...createScheduleDto,
        room: roomExists,
      } as any);
      const result = await this.scheduleRepository.save(schedule);

      return {
        message: 'Programación creada exitosamente',
        data: result,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Error al crear la programación', 500);
    }
  }

  async findAll() {
    try {
      const schedules = await this.scheduleRepository.find({ relations: ['room'] });
      return {
        message: 'Lista de programaciones obtenidas exitosamente',
        data: schedules,
      };
    } catch (error) {
      console.error(error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Error al obtener las programaciones', 500);
    }
  }

  async findOne(id: number) {
    try {
      const schedule = await this.scheduleRepository.findOne({ where: { schedule_id: id }, relations: ['room'] });
      if (!schedule) {
        throw new NotFoundException('Programación no encontrada');
      }
      return {
        message: 'Programación obtenida exitosamente',
        data: schedule,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Error al obtener la programación', 500);
    }
  }

  async update(id: number, updateScheduleDto: UpdateScheduleDto) {
    try {
      const schedule = await this.scheduleRepository.update(id, updateScheduleDto);
      if (schedule.affected === 0) {
        throw new NotFoundException('Programación no encontrada');
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Error al actualizar la programación', 500);
    }
    return `This action updates a #${id} schedule`;
  }

  async remove(id: number) {
    try {
      const schedule = await this.scheduleRepository.delete(id);
      if (schedule.affected === 0) {
        throw new NotFoundException('Programación no encontrada');
      } else {
        return {
          message: `Programación ${id} eliminada exitosamente`,
        };
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Error al eliminar la programación', 500);
    }
  }
}
