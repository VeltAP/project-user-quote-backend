import { IsOptional, IsEmail, Matches, ValidateIf } from "class-validator";

export class UpdateUserDto {
        @IsOptional()
        first_name?: string

        @IsOptional()
        last_name?: string

        @IsOptional()
        @IsEmail()
        email?: string

        @IsOptional()
        refresh_token?: string

        @ValidateIf((o) => typeof o.password === 'string' && o.password.length > 0)
        @IsOptional()
        password?: string

        @ValidateIf((o) => typeof o.confirm_password === 'string' && o.confirm_password.length > 0)
        @IsOptional()
        confirm_password?: string
}