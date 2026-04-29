import { IsArray, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString({ message: 'El rol debe de ser una cadena' })
  name: string;

  @IsArray({ message: 'Se debe adjuntar un array con los permisos deseados' })
  permissions: number[];
}
