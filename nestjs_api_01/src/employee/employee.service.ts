import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as uniqid from 'uniqid';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEmployeeTypes } from 'src/utils/employe_utils/createEmployee.types';

@Injectable()
export class EmployeeService {
  constructor(private prismaService: PrismaService) {}

  async createNewEmployee(
    profile_owner: string,
    createEmployeeTypes: CreateEmployeeTypes,
  ) {
    try {
      const created_employee = await this.prismaService.employee.create({
        data: {
          profile_owner,
          employee_id: uniqid(),
          firstName: createEmployeeTypes.firstName,
          lastName: createEmployeeTypes.lastName,
          date_of_birth: createEmployeeTypes.date_of_birth,
          age: createEmployeeTypes.age,
          position: createEmployeeTypes.position,
        },
      });
      return created_employee;
    } catch (error) {
      console.log(error);
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    }
  }
}
