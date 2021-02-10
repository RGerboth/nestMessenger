import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateMessageDto {
    @ApiProperty({ description: 'The name of the sender.' })
    @IsString()
    readonly from: string;

    @ApiProperty({ description: 'The name of the receiver.' })
    @IsString()
    readonly to: string;

    @ApiProperty({ description: 'The message.' })
    @IsString()
    readonly message: string;
}
