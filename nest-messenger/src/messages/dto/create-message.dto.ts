import { IsString } from 'class-validator';

export class CreateMessageDto {
    @IsString()
    readonly from: string;
    @IsString()
    readonly to: string;
    @IsString()
    readonly message: string;
}
