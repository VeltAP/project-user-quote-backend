import {
    BadRequestException,
    Body,
    Injectable,
    NotFoundException,
    Res,
    UnauthorizedException
} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {User} from "../user/user.entity";
import {UserService} from "../user/user.service";
import {SignUpDto} from "./dto/signup.dto";
import * as bcrypt from 'bcrypt';
import {LoginDto} from "./dto/login.dto";
import { Response } from "express";
// import {QuoteService} from "../quote/quote.service";
// import {Quote} from "../quote/quote.entity";


@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService,
        // @InjectRepository(User)
        // private readonly userRepository: Repository<User>,
        private userService: UserService,
        // private quoteService: QuoteService,
    ) {
    }

    async createNewUser(@Body() body: SignUpDto): Promise<User> {

        if (body.password !== body.password_confirm) {
            throw new BadRequestException('Password do not match!');
        }

        const hashedPassword = await bcrypt.hash(body.password, 12);

        return this.userService.create({
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            password: hashedPassword,
        });

    }

    async login(
        @Body() body: LoginDto,
        @Res({passthrough: true}) response: Response
    ) {
        const user = await this.userService.findOne({email: body.email});

        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (!(await bcrypt.compare(body.password, user.password))) {
            throw new BadRequestException('Invalid password');
        }

        const jwt = await this.jwtService.signAsync({id: user.id});

        response.cookie('jwt', jwt, {httpOnly: true})

        return user;
    }

    // async userById(@Req() request: Request) {
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

    async findUserById(id: number): Promise<User | undefined> {
        const data = await this.userService.findOne({
            id: id,
        });

        if (!data) {
            throw new UnauthorizedException('User does not exist');
        }

        return data;
    }

    // async findUserQuote(id: number): Promise<Quote | undefined> {
    //
    //     const data = await this.quoteService.findOne({
    //         id: id,
    //     });
    //
    //     if (!data) {
    //         throw new UnauthorizedException('Quote does not exist');
    //     }
    //
    //     return data;

        // const data = await this.quoteService.getQuoteByUser({
        //     // where: { user: user },
        //     where: { id: id },
        //     relations: [
        //         'user',
        //         // 'usersUpVoted',
        //         // 'usersDownVoted'
        //     ],
        // });
        //
        // return data;
    // }

    // async userId(request: Request): Promise<number> {
    //     const cookie = request.cookies['jwt'];
    //
    //     const data = await this.jwtService.verifyAsync(cookie);
    //
    //     return data['id'];
    // }
}
