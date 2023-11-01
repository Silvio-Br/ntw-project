// absences.controller.ts

import {Controller, Get, Post, Param, Body, Put, Delete} from '@nestjs/common';
import {AbsencesService} from './absences.service';
import {AbsenceDto} from './dto/absence.dto';
import {
    ApiBadRequestResponse, ApiBody, ApiCreatedResponse,
    ApiNoContentResponse,
    ApiOkResponse,
    ApiParam,
    ApiProperty,
    ApiTags
} from "@nestjs/swagger";

@ApiTags('absences')
@Controller('absences')
export class AbsencesController {
    constructor(private readonly absenceService: AbsencesService) {
    }

    @Get()
    @ApiOkResponse({
        description: 'Returns an array of absences',
        type: AbsenceDto,
        isArray: true,
    })
    @ApiNoContentResponse({description: 'No absence exists in database'})
    findAll() {
        return this.absenceService.findAll();
    }

    @Get(':id')
    @ApiOkResponse({
        description: 'Returns an absence by id',
        type: AbsenceDto,
    })
    @ApiBadRequestResponse({description: 'Validation failed'})
    @ApiNoContentResponse({description: 'No absence exists in database for this id'})
    @ApiParam({
        name: 'id',
        description: 'Unique identifier of the absence in the database',
        type: String,
        allowEmptyValue: false,
    })
    findById(@Param('id') id: string) {
        return this.absenceService.findById(id);
    }


    @Get('professor/:professorId')
    @ApiOkResponse({
        description: 'Returns an array of absences for a professor',
        type: AbsenceDto,
        isArray: true,
    })
    @ApiNoContentResponse({description: 'No absence exists in database for this professor'})
    @ApiParam({
        name: 'professorId',
        description: 'Unique identifier of the professor in the database',
        type: String,
        allowEmptyValue: false,
    })
    findByProfessorId(@Param('professorId') professorId: string) {
        return this.absenceService.findByProfessorId(professorId);
    }

    @Get('student/:studentId')
    @ApiOkResponse({
        description: 'Returns an array of absences for a student',
        type: AbsenceDto,
        isArray: true,
    })
    @ApiNoContentResponse({description: 'No absence exists in database for this student'})
    @ApiParam({
        name: 'studentId',
        description: 'Unique identifier of the student in the database',
        type: String,
        allowEmptyValue: false,
    })
    findByStudentId(@Param('studentId') studentId: string) {
        return this.absenceService.findByStudentId(studentId);
    }

    @Post()
    @ApiCreatedResponse({
        description: 'The absence has been successfully created',
        type: AbsenceDto,
    })
    @ApiBadRequestResponse({description: 'Payload provided is not good'})
    @ApiBody({
        description: 'Payload to create a new absence',
        type: AbsenceDto,
    })
    create(@Body() absenceDto: AbsenceDto) {
        return this.absenceService.create(absenceDto);
    }

    @Put(':id')
    @ApiOkResponse({
        description: 'The absence has been successfully updated',
        type: AbsenceDto,
    })
    @ApiBadRequestResponse({description: 'Payload provided is not good'})
    @ApiParam({
        name: 'id',
        description: 'Unique identifier of the absence in the database',
        type: String,
        allowEmptyValue: false,
    })
    update(@Param('id') id: string, @Body() absenceDto: AbsenceDto) {
        return this.absenceService.update(id, absenceDto);
    }

    @Delete(':id')
    @ApiOkResponse({
        description: 'The absence has been successfully deleted',
        type: AbsenceDto,
    })
    @ApiBadRequestResponse({description: 'Validation failed'})
    @ApiParam({
        name: 'id',
        description: 'Unique identifier of the absence in the database',
        type: String,
        allowEmptyValue: false,
    })
    remove(@Param('id') id: string) {
        return this.absenceService.delete(id);
    }
}
