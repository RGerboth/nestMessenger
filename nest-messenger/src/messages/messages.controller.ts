import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { query } from 'express';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
    constructor(private readonly messagesService: MessagesService) {}
    @Get()
    findAll(@Query() query) {
        const { limit, offset, dateFrom, dateTo } = query;
        return this.messagesService.findAll(limit, offset, dateFrom, dateTo);
    }
    @Get('/bySenderId/:id')
    findBySender(@Param('id') id: string, @Query() query) {
        const { limit, offset, from, to } = query;
        return this.messagesService.findBySender(id, limit, offset, from, to);
    }
    @Get('/byReceiverId/:id')
    findByReceiver(@Param('id') id: string, @Query() query) {
        const { limit, offset, from, to } = query;
        return this.messagesService.findByReceiver(id, limit, offset, from, to);
    }
    @Post()
    addMessage(@Body() body) {
        const { from, to, message } = body;
        return this.messagesService.addMessage(from, to, message);
    }
    @Delete(':id')
    deleteMessage(@Param('id') id: string) {
        return this.messagesService.deleteMessage(id);
    }
}
