import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EmployeeDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  age: number;

  @IsNotEmpty()
  @IsString()
  date_of_birth: string;

  @IsNotEmpty()
  @IsString()
  position: string;
}
