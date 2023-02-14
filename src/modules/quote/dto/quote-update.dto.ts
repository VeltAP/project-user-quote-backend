import { IsNotEmpty } from "class-validator";

export class QuoteUpdateDto {
    @IsNotEmpty()
    text : string;
    
    @IsNotEmpty()
    karma : number;
    
    @IsNotEmpty()
    user_id : number
}