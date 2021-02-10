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

    @Get('/bySenderName/:name')
    findBySender(@Param('name') name: string, @Query() query) {
        const { recipient, limit, offset, dateFrom, dateTo } = query;
        return this.messagesService.findBySender(name, recipient, limit, offset, dateFrom, dateTo);
    }

    @Get('/byReceiverName/:name')
    findByReceiver(@Param('name') name: string, @Query() query) {
        const { sender, limit, offset, dateFrom, dateTo } = query;
        return this.messagesService.findByReceiver(name, sender, limit, offset, dateFrom, dateTo);
    }

    @Post()
    addMessage(@Body() createMessageDto: CreateMessageDto) {
        return this.messagesService.addMessage(createMessageDto);
    }

    @Patch(':id')
    updateMessage(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
        return this.messagesService.updateMessage(id, updateMessageDto);
    }

    @Delete(':id')
    deleteMessage(@Param('id') id: string) {
        return this.messagesService.deleteMessage(id);
    }
}
