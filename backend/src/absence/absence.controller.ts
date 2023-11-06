// absence.controller.ts

import {Controller, Get, Post, Param, Body, Put, Delete, UseGuards} from '@nestjs/common';
import {AbsenceService} from './absence.service';
import {AbsenceDto} from './dto/absence.dto';
import {UpdateAbsenceEtatDto} from './dto/update-absence-etat.dto';
import {AuthGuard} from "@nestjs/passport";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('absences')
@Controller('absences')
export class AbsenceController {
    constructor(private readonly absenceService: AbsenceService) {
    }

    @Get()
    @UseGuards(AuthGuard('professor'))
    findAll() {
        return this.absenceService.findAll();
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    findById(@Param('id') id: string) {
        return this.absenceService.findById(id);
    }

    @Get('professor/:professorId')
    @UseGuards(AuthGuard('professor'))
    findByProfessorId(@Param('professorId') professorId: string) {
        return this.absenceService.findByProfessorId(professorId);
    }

    @Get('student/:studentId')
    @UseGuards(AuthGuard('student'))
    findByStudentId(@Param('studentId') studentId: string) {
        return this.absenceService.findByStudentId(studentId);
    }

    @Post()
    @UseGuards(AuthGuard('professor'))
    create(@Body() absenceDto: AbsenceDto) {
        return this.absenceService.create(absenceDto);
    }

    @Put(':id')
    @UseGuards(AuthGuard('professor'))
    update(@Param('id') id: string, @Body() absenceDto: AbsenceDto) {
        return this.absenceService.update(id, absenceDto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('professor'))
    remove(@Param('id') id: string) {
        return this.absenceService.delete(id);
    }

    @Put('etat/:id') // Use a different route for updating etat
    @UseGuards(AuthGuard('professor'))
    updateEtat(@Param('id') id: string, @Body() updateAbsenceEtatDto: UpdateAbsenceEtatDto) {
        return this.absenceService.updateEtat(id, updateAbsenceEtatDto.etat);
    }
}
