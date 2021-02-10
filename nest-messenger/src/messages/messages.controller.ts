import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
    constructor(private readonly messagesService: MessagesService) {}
    @Get()
    findAll(@Query() query: any) {
        const { limit, offset, dateFrom, dateTo } = query;
        return this.messagesService.findAll(limit, offset, dateFrom, dateTo);
    }

    @Get('/bySenderId/:id')
    findBySender(@Param('id') id: string, @Query() query) {
        const { limit, offset, dateFrom, dateTo } = query;
        return this.messagesService.findBySender(id, limit, offset, dateFrom, dateTo);
    }

    @Get('/byReceiverId/:id')
    findByReceiver(@Param('id') id: string, @Query() query) {
        const { limit, offset, dateFrom, dateTo } = query;
        return this.messagesService.findByReceiver(id, limit, offset, dateFrom, dateTo);
    }

    @Post()
    addMessage(@Body() createMessageDto: CreateMessageDto) {
        const { from, to, message } = createMessageDto;
        return this.messagesService.addMessage(from, to, message);
    }

    @Patch(':id')
    updateMessage(@Param('id') id: number, @Body() updateMessageDto: UpdateMessageDto) {
        const { from, to, message } = updateMessageDto;
        return this.messagesService.updateMessage(id, from, to, message);
    }

    @Delete(':id')
    deleteMessage(@Param('id') id: string) {
        return this.messagesService.deleteMessage(id);
    }
}
