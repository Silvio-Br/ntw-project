import {Controller, Get, Post, Body, Param, Delete} from '@nestjs/common';
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


@ApiTags('messages')
@Controller('messages')
export class MessagesController {
    messageModel: any;
    constructor(private readonly messagesService: MessagesService) {}

    @Post()
    @ApiCreatedResponse({ description: 'The record has been successfully created.'})
    @ApiBadRequestResponse({ description: 'Validation failed.'})
    @ApiBody({ type: CreateMessageDto })
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
    async delete(id: string): Promise<Message> {
        return this.messageModel.findByIdAndRemove(id).exec();
    }
    // Implement other CRUD endpoints
}
