import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Get()
  getEmployees() {}

  @Post()
  createEmployee() {}

  @Patch()
  updateEmployee() {}

  @Delete()
  deleteEmployee() {}
}
