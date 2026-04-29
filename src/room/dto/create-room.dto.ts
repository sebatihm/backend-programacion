import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRoomDto {
    @IsNotEmpty({ message: 'Este campo no puede ir vacío.' })
    @IsString({ message: 'Este campo debe ser una cadena' })
    name: string;

    @IsNotEmpty({ message: 'Este campo no puede ir vacío.' })
    @IsString({ message: 'Este campo debe ser una cadena' })
    type: string;

    @IsNotEmpty({ message: 'Este campo no puede ir vacío.' })
    @IsBoolean({  })
    status: boolean;
    
    @IsString({ message: 'Este campo debe ser una cadena' })
    @IsString({ message: 'Este campo debe ser una cadena' })
    comments: string;

    @IsNotEmpty({ message: 'Este campo no puede ir vacío.' })
    @IsNumber({}, { message: 'Este campo debe ser un número' })
    schedule_id: number;
}
