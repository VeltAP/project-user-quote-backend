import {
    Body,
    Controller, Get, Param,
    Post,
    Res
} from '@nestjs/common';
import {AuthService} from "./auth.service";
// import * as bcrypt from 'bcrypt';
// import {UserService} from "../user/user.service";
// import {JwtService} from "@nestjs/jwt";
import {Response} from "express";
import {SignUpDto} from "./dto/signup.dto";
import {LoginDto} from "./dto/login.dto";

@Controller()
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        // private readonly userService: UserService,
        // private jwtService: JwtService
    ) {
    }

    @Post('signup')
    async signup(@Body() newUser: SignUpDto) {
        return this.authService.createNewUser(newUser);
    }


    @Post('login')
    async login(@Body() loggedUser: LoginDto,
                @Res({passthrough: true}) response: Response) {
        return this.authService.login(loggedUser, response)
    }

    @Post('logout')
    async logout(@Res({passthrough: true}) response: Response) {
        response.clearCookie('jwt');

        return {
            message: 'Success'
        };
    }

    @Get('user/:id')
    async getUser(@Param() params) {
        const user = await this.authService.findUserById(params.userId);

        if (!user) {
            return { notFound: 'user not found' };
        }

        // const quote = await this.authService.findUserQuote(params.quoteId);
        //
        // if (!quote) {
        //     return { notFound: 'user not post quote yet' };
        // }

        return {
            // quoteId: quote.id,
            // text: quote.text,
            user: {
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                userId: user.id,
            }
        };
    }

    // @Get('user/:id')
    // async findUserById(@Req() request: Request) {
    //     try {
    //         const cookie = request.cookies['jwt'];
    //
    //         const data = await this.jwtService.verifyAsync(cookie);
    //
    //         if (!data) {
    //             throw new UnauthorizedException('User does not exist');
    //         }
    //
    //         const user = await this.userService.findOne({id: data['id']});
    //
    //         const {password, ...result} = user
    //
    //         return result;
    //
    //     } catch (e) {
    //         throw new UnauthorizedException('User does not exist');
    //     }
    // }

}
