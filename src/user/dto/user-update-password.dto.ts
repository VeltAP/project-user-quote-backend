import {IsNotEmpty} from "class-validator";

export class UserUpdatePasswordDto {
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    password_confirm: string;
}