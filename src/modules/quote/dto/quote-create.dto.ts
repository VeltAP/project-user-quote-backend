
import { IsNotEmpty } from "class-validator";
import { Timestamp } from "typeorm";

export class QuoteCreateDto {
    @IsNotEmpty()
    karma : number;

    @IsNotEmpty()
    text : string;
    
    @IsNotEmpty()
    posted_when: Timestamp

    @IsNotEmpty()
    user_id : number
}