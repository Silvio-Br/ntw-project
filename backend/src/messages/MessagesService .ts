import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateMessageDto } from './CreateMessageDto';
import { Message } from './Message';
import { UpdateMessageDto } from './UpdateMessageDto ';

export class MessagesService {
    constructor(@InjectModel('Message') private readonly messageModel: Model<Message>) {}

    async create(createMessageDto: CreateMessageDto): Promise<Message> {
        try {
            const createdMessage = new this.messageModel(createMessageDto);
            return createdMessage.save();
        } catch (error) {
            throw new Error('Erreur lors de la création du message.');
        }
    }

    async findAll(): Promise<Message[]> {
        try {
            return this.messageModel.find().exec();
        } catch (error) {
            throw new Error('Erreur lors de la récupération de tous les messages.');
        }
    }

    async findByTo(to: string): Promise<Message[]> {
        try {
            return this.messageModel.find({ to }).exec();
        } catch (error) {
            throw new Error(`Erreur lors de la recherche de messages pour le destinataire ${to}.`);
        }
    }

    async findByFrom(from: string): Promise<Message[]> {
        try {
            return this.messageModel.find({ from }).exec();
        } catch (error) {
            throw new Error(`Erreur lors de la recherche de messages de l'expéditeur ${from}.`);
        }
    }

    async update(id: string, updateMessageDto: UpdateMessageDto): Promise<Message> {
        const updatedMessage = await this.messageModel.findByIdAndUpdate(
          id,
          { seen: updateMessageDto.seen },
          { new: true }, // To get the updated document
        ).exec();
        if (!updatedMessage) {
          throw new Error(`Message with ID ${id} not found.`);
        }
        return updatedMessage;
      }
}