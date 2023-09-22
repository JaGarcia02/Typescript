import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { JwtGuard } from 'src/auth/guards';
import { GetUser } from 'src/auth/decorator';
import { Employee, User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Get('viewEmployees')
  getEmployees() {
    return 'dhgdshgkjdf';
  }

  @Post()
  createEmployee() {
    return 'this is post';
  }

  @Patch()
  updateEmployee() {}

  @Delete()
  deleteEmployee() {}
}
