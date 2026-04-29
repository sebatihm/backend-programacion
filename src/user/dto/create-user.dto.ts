import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'El correo debe ser valido' })
  email: string;

  @IsString({ message: 'El nombre debe ser una cadena' })
  @IsNotEmpty({ message: 'El nombre no debe de estar vacio' })
  name: string;

  @IsString({ message: 'El apellido paterno debe ser una cadena' })
  @IsNotEmpty({ message: 'El apellido paterno no debe de estar vacio' })
  last_name: string;

  @IsString({ message: 'El apellido materno debe ser una cadena' })
  @IsNotEmpty({ message: 'El apellido materno no debe de estar vacio' })
  last_mother_name: string;

  @IsString({ message: 'El nombre debe ser una cadena' })
  @IsNotEmpty({ message: 'El nombre no debe de estar vacio' })
  @MinLength(8, {
    message: 'La contraseña debe de tener al menos 8 caracteres',
  })
  password: string;

  @IsNumber({}, { message: 'El rol id debe ser un numero' })
  role_id: number;
}
