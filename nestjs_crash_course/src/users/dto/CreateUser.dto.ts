import { IsEmail, IsNotEmpty } from 'class-validator';

// this class-validator is use to validate the request data you are sending to check if it is valid or not

/*
 this simplifies the validation for the request in the body, 
 unlike in MERN or in Nodejs you will create multiple conditions
 just to check if the user inserted a valid data 
 */
export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
