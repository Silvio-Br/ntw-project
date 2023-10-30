import { Document, Schema, Types } from 'mongoose';

export class Message extends Document {
    from: string;
    to: string;
    message: string;
    date: Date;
    seen: boolean;
    lastSeen: Date;
}

export const MessageSchema = new Schema<Message>({
    from: { type: String, required: true },
    to: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, required: false },
    seen: { type: Boolean, default: false },
    lastSeen: { type: Date, required: false },
});
