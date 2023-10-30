import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagesController } from './MessagesController';
import { MessageSchema } from './Message';
import { MessagesService } from './MessagesService ';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }])],
    controllers: [MessagesController],
    providers: [MessagesService],
})
export class MessagesModule {}
