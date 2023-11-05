import {Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Logger} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesService } from './messages.service';
import { Message } from './schema/message.schema';
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiCreatedResponse,
    ApiNoContentResponse,
    ApiOkResponse,
    ApiParam, ApiTags
} from "@nestjs/swagger";
import {UpdateMessageDto} from "./dto/update-message.dto";
import {AuthGuard} from "@nestjs/passport";


@ApiTags('messages')
@Controller('messages')
export class MessagesController {
    messageModel: any;
    constructor(private readonly messagesService: MessagesService) {}

    @Post()
    @ApiCreatedResponse({ description: 'The record has been successfully created.'})
    @ApiBadRequestResponse({ description: 'Validation failed.'})
    @ApiBody({ type: CreateMessageDto })
    @UseGuards(AuthGuard('jwt'))
    create(@Body() createMessageDto: CreateMessageDto) {
        return this.messagesService.create(createMessageDto);
    }

    @Get()
    @ApiOkResponse({
        description: 'Returns an array of messages',
        type: Message,
        isArray: true,
    })
    @ApiBadRequestResponse({description: 'Validation failed'})
    @ApiNoContentResponse({description: 'No message exists in database'})
    @UseGuards(AuthGuard('jwt'))
    findAll() {
        return this.messagesService.findAll();
    }
    @Get('to/:to')
    @ApiOkResponse({
        description: 'Returns an array of messages for a recipient',
        type: Message,
        isArray: true,
    })
    @ApiBadRequestResponse({description: 'Validation failed'})
    @ApiNoContentResponse({description: 'No message exists in database for this recipient'})
    @UseGuards(AuthGuard('jwt'))
    async findByTo(@Param('to') to: string): Promise<Message[]> {
        return this.messagesService.findByTo(to);
    }

    @Get('from/:from')
    @ApiOkResponse({
        description: 'Returns an array of messages for a sender',
        type: Message,
        isArray: true,
    })
    @ApiBadRequestResponse({description: 'Validation failed'})
    @ApiNoContentResponse({description: 'No message exists in database for this sender'})
    @ApiParam({
        name: 'from',
        description: 'Unique identifier of the sender in the database',
        type: String,
        allowEmptyValue: false,
    })
    @UseGuards(AuthGuard('jwt'))
    async findByFrom(@Param('from') from: string): Promise<Message[]> {
        return this.messagesService.findByFrom(from);
    }

    @Delete(':id')
    @ApiOkResponse({
        description: 'The message has been successfully deleted',
        type: Message,
    })
    @ApiBadRequestResponse({description: 'Validation failed'})
    @ApiParam({
        name: 'id',
        description: 'Unique identifier of the message in the database',
        type: String,
        allowEmptyValue: false,
    })
    @ApiNoContentResponse({description: 'Message with the given "id" not found'})
    @UseGuards(AuthGuard('jwt'))
    async delete(@Param('id') id: string): Promise<Message | void> {
        return this.messagesService.delete(id);
    }
    // Implement other CRUD endpoints

    @ApiOkResponse({
        description: 'The message has been successfully updated',
        type: Message,
    })
    @ApiBadRequestResponse({description: 'Validation failed'})
    @ApiParam({
        name: 'id',
        description: 'Unique identifier of the message in the database',
        type: String,
        allowEmptyValue: false,
    })
    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    async update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto): Promise<Message> {
        return this.messagesService.update(id, updateMessageDto);
    }
}
