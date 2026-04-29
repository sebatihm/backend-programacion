import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Schedule } from 'src/schedule/entities/schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room, Schedule])],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
