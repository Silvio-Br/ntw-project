import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateMessageDto } from './CreateMessageDto';
import { MessagesService } from './MessagesService ';
import { Message } from './Message';

@Controller('messages')
export class MessagesController {
    messageModel: any;
    constructor(private readonly messagesService: MessagesService) {}

    @Post()
    create(@Body() createMessageDto: CreateMessageDto) {
        return this.messagesService.create(createMessageDto);
    }

    @Get()
    findAll() {
        return this.messagesService.findAll();
    }
    @Get('to/:to')
    async findByTo(@Param('to') to: string): Promise<Message[]> {
        return this.messagesService.findByTo(to);
    }

    @Get('from/:from')
    async findByFrom(@Param('from') from: string): Promise<Message[]> {
        return this.messagesService.findByFrom(from);
    }
    async delete(id: string): Promise<Message> {
        return this.messageModel.findByIdAndRemove(id).exec();
    }
    // Implement other CRUD endpoints
}
