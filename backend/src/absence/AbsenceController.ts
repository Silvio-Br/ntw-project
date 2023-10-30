// absence.controller.ts

import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { AbsenceService } from './AbsenceService';
import { AbsenceDto } from './AbsenceDto';

@Controller('absences')
export class AbsenceController {
  constructor(private readonly absenceService: AbsenceService) {}

  @Get()
  findAll() {
    return this.absenceService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.absenceService.findById(id);
  }

  @Get('professor/:professorId')
  findByProfessorId(@Param('professorId') professorId: string) {
    return this.absenceService.findByProfessorId(professorId);
  }

  @Get('student/:studentId')
  findByStudentId(@Param('studentId') studentId: string) {
    return this.absenceService.findByStudentId(studentId);
  }

  @Post()
  create(@Body() absenceDto: AbsenceDto) {
    return this.absenceService.create(absenceDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() absenceDto: AbsenceDto) {
    return this.absenceService.update(id, absenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.absenceService.delete(id);
  }
}
