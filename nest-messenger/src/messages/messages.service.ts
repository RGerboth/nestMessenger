import { Injectable } from '@nestjs/common';
// import { stringify } from 'querystring';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
    private messages: Message[] = [
        {
            id: 123,
            from: 'Robert',
            to: 'Steve',
            message: 'lunch?',
        },
    ];

    findAll(limit: string, offset: string, dateFrom: Date, dateTo: Date) {
        return `These are your messages, sir. ${limit}, ${offset}`;
    }

    findBySender(id: string, limit: string, offset: string, dateFrom: Date, dateTo: Date) {
        return `These are your sent messages, #${id}. ${limit}, ${offset}, ${dateFrom}, ${dateTo}`;
    }

    findByReceiver(id: string, limit: string, offset: string, dateFrom: Date, dateTo: Date) {
        return `These are your incoming messages, #${id}. ${limit}, ${offset}, ${dateFrom}, ${dateTo}`;
    }

    addMessage(from: string, to: string, message: string) {
        return `Sent Message From: ${from} To: ${to} "${message}" `;
    }

    updateMessage(id: number, from: string, to: string, message: string) {
        return `Updated Message ID: ${id} From: ${from} To: ${to} "${message}" `;
    }

    deleteMessage(id: string) {
        return `Deleted message id ${id}`;
    }
}
