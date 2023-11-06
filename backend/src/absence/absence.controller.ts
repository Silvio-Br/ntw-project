// absence.controller.ts

import {Controller, Get, Post, Param, Body, Put, Delete, UseGuards} from '@nestjs/common';
import {AbsenceService} from './absence.service';
import {AbsenceDto} from './dto/absence.dto';
import {UpdateAbsenceEtatDto} from './dto/update-absence-etat.dto';
import {AuthGuard} from "@nestjs/passport";
import {
    ApiBadRequestResponse, ApiBearerAuth, ApiBody,
    ApiConflictResponse,
    ApiNoContentResponse, ApiNotFoundResponse,
    ApiOkResponse,
    ApiParam,
    ApiTags
} from "@nestjs/swagger";

@ApiTags('absences')
@Controller('absences')
export class AbsenceController {
    constructor(private readonly absenceService: AbsenceService) {
    }

    @ApiOkResponse({
        description: 'Returns all absences.',
        type: AbsenceDto,
    })
    @ApiNoContentResponse({description: 'No absence exists in database'})
    @Get()
    @ApiBearerAuth()
    @UseGuards(AuthGuard('professor'))
    findAll() {
        return this.absenceService.findAll();
    }

    @ApiOkResponse({
        description: 'Returns an absence by id.',
        type: AbsenceDto,
    })
    @ApiNoContentResponse({description: 'No absence with the id given exists in database'})
    @ApiBadRequestResponse({description: 'Validation failed'})
    @ApiParam({
        name: 'id',
        description: 'Unique identifier of the absence in the database',
        type: String,
        allowEmptyValue: false,
    })
    @Get(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    findById(@Param('id') id: string) {
        return this.absenceService.findById(id);
    }

    @ApiOkResponse({
        description: 'Returns all absences created by a professor.',
        type: AbsenceDto,
    })
    @ApiNoContentResponse({description: 'No absence with the professor id given exists in database'})
    @ApiBadRequestResponse({description: 'Validation failed'})
    @ApiParam({
        name: 'professorId',
        description: 'Unique identifier of the professor in the database',
        type: String,
        allowEmptyValue: false,
    })
    @Get('professor/:professorId')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('professor'))
    findByProfessorId(@Param('professorId') professorId: string) {
        return this.absenceService.findByProfessorId(professorId);
    }


    @ApiOkResponse({
        description: 'Returns all absences of a student.',
        type: AbsenceDto,
    })
    @ApiNoContentResponse({description: 'No absence with the student id given exists in database'})
    @ApiBadRequestResponse({description: 'Validation failed'})
    @ApiParam({
        name: 'studentId',
        description: 'Unique identifier of the student in the database',
        type: String,
        allowEmptyValue: false,
    })
    @Get('student/:studentId')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('student'))
    findByStudentId(@Param('studentId') studentId: string) {
        return this.absenceService.findByStudentId(studentId);
    }

    @ApiOkResponse({
        description: 'Create an absence.',
        type: AbsenceDto,
    })
    @ApiBadRequestResponse({description: 'Validation failed'})
    @ApiConflictResponse({description: 'Absence already exists'})
    @ApiBody({
        description: 'Absence to create',
        type: AbsenceDto,
    })
    @Post()
    @ApiBearerAuth()
    @UseGuards(AuthGuard('professor'))
    create(@Body() absenceDto: AbsenceDto) {
        return this.absenceService.create(absenceDto);
    }

    @ApiOkResponse({
        description: 'Update an absence.',
        type: AbsenceDto,
    })
    @ApiNotFoundResponse({description: 'Absence with the given "id" not found'})
    @ApiBadRequestResponse({description: 'Validation failed'})
    @ApiParam({
        name: 'id',
        description: 'Unique identifier of the absence in the database',
        type: String,
        allowEmptyValue: false,
    })
    @Put(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('professor'))
    update(@Param('id') id: string, @Body() absenceDto: AbsenceDto) {
        return this.absenceService.update(id, absenceDto);
    }

    @ApiNoContentResponse({description: 'Absence has been successfully deleted'})
    @ApiNotFoundResponse({description: 'Absence with the given "id" not found'})
    @ApiBadRequestResponse({description: 'Validation failed'})
    @ApiParam({
        name: 'id',
        description: 'Unique identifier of the absence in the database',
        type: String,
        allowEmptyValue: false,
    })
    @Delete(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('professor'))
    remove(@Param('id') id: string) {
        return this.absenceService.delete(id);
    }

    @ApiOkResponse({
        description: 'Update the state of an absence',
        type: AbsenceDto,
    })
    @ApiNotFoundResponse({description: 'Absence with the given "id" not found'})
    @ApiBadRequestResponse({description: 'Validation failed'})
    @ApiParam({
        name: 'id',
        description: 'Unique identifier of the absence in the database',
        type: String,
        allowEmptyValue: false,
    })
    @ApiBody({
        description: 'State to update',
        type: UpdateAbsenceEtatDto,
    })
    @Put('etat/:id') // Use a different route for updating etat
    @ApiBearerAuth()
    @UseGuards(AuthGuard('professor'))
    updateEtat(@Param('id') id: string, @Body() updateAbsenceEtatDto: UpdateAbsenceEtatDto) {
        return this.absenceService.updateEtat(id, updateAbsenceEtatDto.etat);
    }
}
