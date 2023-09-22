import {
  Body,
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
import { EmployeeDto } from './dto/employee.dto';

@UseGuards(JwtGuard)
@Controller('employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Get('viewEmployees')
  getEmployees() {
    return 'dhgdshgkjdf';
  }

  @Post('createEmployee')
  createEmployee(
    @GetUser('email') email: string,
    @Body() employeeDto: EmployeeDto,
  ) {
    return this.employeeService.createNewEmployee(email, employeeDto);
  }

  @Patch()
  updateEmployee() {}

  @Delete()
  deleteEmployee() {}
}
