import { Controller, Get } from '@nestjs/common';

@Controller('messages')
export class MessagesController {
    @Get()
    find() {
        return 'These are your messages, sir.'
    }
}
