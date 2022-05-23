import { IsNotEmpty } from 'class-validator';
import {User} from "../../user/user.entity";

export class QuoteCreateDto {
    @IsNotEmpty()
    text: string;
    // upVotes?: number;
    // downVotes?: number;
    user: User;
}
