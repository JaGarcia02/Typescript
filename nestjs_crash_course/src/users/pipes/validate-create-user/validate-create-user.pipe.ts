import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';

// https://www.youtube.com/watch?v=xzu3QXwo1BU&list=PL_cUvD4qzbkw-phjGK2qq0nQiG6gw1cKK&ab_channel=AnsontheDeveloper 1:31:14 / 1:40:06
@Injectable()
export class ValidateCreateUserPipe implements PipeTransform {
  transform(value: CreateUserDto, metadata: ArgumentMetadata) {
    console.log('Inside validate');
    console.log(value);
    console.log(metadata);

    // this function will replace any string to number in value.age

    const parseAgeToInt = parseInt(value.age.toString());
    if (isNaN(parseAgeToInt)) {
      console.log(`${parseAgeToInt} is not a number!`);

      throw new HttpException('Invalid value for age', HttpStatus.BAD_REQUEST);
    }
    console.log(`${parseAgeToInt} is a number`);
    return { ...value, age: parseAgeToInt };
  }
}
