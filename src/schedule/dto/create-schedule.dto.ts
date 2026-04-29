import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateScheduleDto {
    
    @IsNotEmpty({ message: 'Este campo no puede ir vacío.' })
    @IsString({ message: 'Este campo debe ser una cadena' })
    startTime: string;
    
    @IsNotEmpty({ message: 'Este campo no puede ir vacío.' })
    @IsString({ message: 'Este campo debe ser una cadena' })
    endTime: string;
    
    @IsNotEmpty({ message: 'Este campo no puede ir vacío.' })
    @IsString({ message: 'Este campo debe ser una cadena' })
    staff: string;

    @IsNotEmpty({ message: 'Este campo no puede ir vacío.' })
    @IsNumber({}, { message: 'Este campo debe ser un número' })
    room_id: number;
}
