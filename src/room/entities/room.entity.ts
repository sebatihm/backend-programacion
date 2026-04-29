import { IsOptional } from "class-validator";
import { Schedule } from "../../schedule/entities/schedule.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Room {
    @PrimaryGeneratedColumn()
    room_id: number;

    @Column({ type: 'varchar', length: 55 })
    name: string;

    @Column({ type: 'varchar', length: 55 })
    type: string;

    @Column({ type: 'bit' })
    status: boolean;

    @Column({ type: 'text' })
    @IsOptional()
    comments: string;

    @OneToMany(() => Schedule, (schedule) => schedule.room)
    schedules: Schedule[];

}
