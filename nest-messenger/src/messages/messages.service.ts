import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
// import { stringify } from 'querystring';
import { Message } from './entities/message.entity';
import * as moment from 'moment';

@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(Message) private readonly messageRepository: Repository<Message>
    ) {}

    async findAll(limit: string, offset: string, dateFrom: Date, dateTo: Date) {
        const providedLimit = +limit || 100;
        const providedOffset = +offset || 0;
        const providedDateFrom = dateFrom
            ? moment(dateFrom).subtract(7, 'hours')
            : moment().subtract(30, 'days').subtract(7, 'hours');
        const providedDateTo = dateTo ? moment(dateTo).add(7, 'hours') : moment().add(7, 'hours');
        const messages = getRepository(Message)
            .createQueryBuilder('message')
            .where('message.created >= :fromDate', { fromDate: providedDateFrom })
            .andWhere('message.created <= :toDate', { toDate: providedDateTo })
            .orderBy('message.created')
            .limit(providedLimit)
            .offset(providedOffset)
            .getMany();
        return messages;
    }

    async findBySender(
        id: string,
        recipient: string,
        limit: string,
        offset: string,
        dateFrom: Date,
        dateTo: Date
    ) {
        const providedLimit = +limit || 100;
        const providedOffset = +offset || 0;
        const providedDateFrom = dateFrom
            ? moment(dateFrom).subtract(7, 'hours')
            : moment().subtract(30, 'days').subtract(7, 'hours');
        const providedDateTo = dateTo ? moment(dateTo).add(7, 'hours') : moment().add(7, 'hours');
        const messages = getRepository(Message)
            .createQueryBuilder('message')
            .where('message.from = :name', { name: id })
            .andWhere('message.to = :to', { to: recipient })
            .andWhere('message.created >= :fromDate', { fromDate: providedDateFrom })
            .andWhere('message.created <= :toDate', { toDate: providedDateTo })
            .orderBy('message.created')
            .limit(providedLimit)
            .offset(providedOffset)
            .getMany();
        return messages;
    }

    async findByReceiver(
        id: string,
        sender: string,
        limit: string,
        offset: string,
        dateFrom: Date,
        dateTo: Date
    ) {
        const providedLimit = +limit || 100;
        const providedOffset = +offset || 0;
        const providedDateFrom = dateFrom
            ? moment(dateFrom).subtract(7, 'hours')
            : moment().subtract(30, 'days').subtract(7, 'hours');
        const providedDateTo = dateTo ? moment(dateTo).add(7, 'hours') : moment().add(7, 'hours');
        const messages = getRepository(Message)
            .createQueryBuilder('message')
            .where('message.to = :name', { name: id })
            .andWhere('message.from = :from', { from: sender })
            .andWhere('message.created >= :fromDate', { fromDate: providedDateFrom })
            .andWhere('message.created <= :toDate', { toDate: providedDateTo })
            .orderBy('message.created')
            .limit(providedLimit)
            .offset(providedOffset)
            .getMany();
        return messages;
    }

    async addMessage(createMessageDto: CreateMessageDto) {
        const message = this.messageRepository.create(createMessageDto);
        return this.messageRepository.save(message);
    }

    async updateMessage(id: string, updateMessageDto: UpdateMessageDto) {
        const message = await this.messageRepository.preload({ id: +id, ...updateMessageDto });
        return this.messageRepository.save(message);
    }

    async deleteMessage(id: string) {
        const message = await this.messageRepository.findOne(+id);
        return this.messageRepository.remove(message);
    }
}
