import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRoomDto {
    @IsNotEmpty({ message: 'El campo nombre no puede ir vacío.' })
    @IsString({ message: 'El campo nombre debe ser una cadena' })
    name: string;

    @IsNotEmpty({ message: 'El campo tipo no puede ir vacío.' })
    @IsString({ message: 'El campo tipo debe ser una cadena' })
    type: string;

    @IsNotEmpty({ message: 'El campo estado no puede ir vacío.' })
    @IsBoolean({  })
    status: boolean;
    
    @IsString({ message: 'El campo comentarios debe ser una cadena' })
    @IsString({ message: 'El campo comentarios debe ser una cadena' })
    comments: string;

    @IsNotEmpty({ message: 'El campo ID de programación no puede ir vacío.' })
    @IsNumber({}, { message: 'El campo ID de programación debe ser un número' })
    schedule_id: number;
}
