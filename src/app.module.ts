import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { datasourceConfig } from './db/data-source';
import { ConfigModule } from '@nestjs/config';
import { RoomModule } from './room/room.module';
import { ScheduleModule } from './schedule/schedule.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(datasourceConfig),
    RoomModule,
    ScheduleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
