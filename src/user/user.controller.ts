import {
    Controller,
    Get,
    Put,
    NotFoundException,
    BadRequestException, Body, Post, Param,
} from '@nestjs/common';
import {UserService} from "./user.service";
import {User} from "./user.entity";
// import {AuthService} from "../auth/auth.service";
import {UserCreateUpdateDto} from "./dto/user-create.dto";
import * as bcrypt from 'bcryptjs';
import {UserUpdatePasswordDto} from "./dto/user-update-password.dto";
import {QuoteService} from "../quote/quote.service";



@Controller('users')
export class UserController {


    constructor(
        private userService: UserService,
        // private quoteService: QuoteService,
        // private authService: AuthService,
    ) {
    }

    @Get()
    async all(): Promise<User[]> {
        return await this.userService.all();
    }

    // endpoint "/me"
    @Get('me')
    async getLoggedUser(id: number): Promise<User> {
        return this.userService.findOne(id);
    }

    // endpoint "/update-password"
    @Put('me/update-password')
    async updateUserPassword(
        userId: number,
        @Body() userUpdate: UserUpdatePasswordDto)
    {
        return await this.userService.updatePassword(userId, userUpdate);
    }

}
