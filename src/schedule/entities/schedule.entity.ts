import { IsNotEmpty } from "class-validator";
import { Room } from "src/room/entities/room.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Schedule {
    @PrimaryGeneratedColumn()
    schedule_id: number;

    @Column({ type: 'varchar', length: 55 })
    @IsNotEmpty({ message: 'Este campo no puede ir vacío.' })
    startTime: string;

    @Column({ type: 'varchar', length: 55 })
    @IsNotEmpty({ message: 'Este campo no puede ir vacío.' })
    endTime: string;

    @Column({ type: 'varchar', length: 55 })
    @IsNotEmpty({ message: 'Este campo no puede ir vacío.' })
    staff: string;

    @ManyToOne(() => Room ,(room) => room.room_id)
    @JoinColumn({ name: 'room_id' })
    room: Room;
}
