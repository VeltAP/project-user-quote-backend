import {
    BadRequestException,
    Body,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {UserUpdatePasswordDto} from "./dto/user-update-password.dto";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        // @InjectRepository(Quote)
        // private readonly quoteRepository: Repository<Quote>,
    ) {}

    async all(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findOne(condition, relations = []): Promise<any> {
        return this.userRepository.findOne(condition, {relations});
    }

    // getUserById(id: number): Promise<User> {
    //     return this.userRepository.findOneOrFail(id).catch(() => {
    //         throw new NotFoundException();
    //     });
    // }

    // async getUserByEmail(email: string) {
    //     const user = await this.userRepository.findOne(
    //         {where: {email}, include: {all: true}})
    // }
    //
    // async getUserByIdNoPass(id: number): Promise<UserResDto> {
    //     const user = await this.getUserById(id);
    //     delete user['password'];
    //     return user;
    // }

    async create(data): Promise<User> {
        return this.userRepository.save(data);
    }

    // /me (get the currently logged-in user profile)
    // async findUserAndKarma(id: number): Promise<number> {
    //
    //     let karma = 0;
    //
    //     const usersQuotes = await this.quoteRepository.find({
    //         where: { user: id },
    //         relations: ['user']
    //     })
    //
    //     usersQuotes.forEach(element => {
    //         karma += element.upVote;
    //     });
    //
    //     return karma;
    // }

    async updatePassword(
            id: number,
            // @Req() request: Request,
            @Body() updateUserPassword: UserUpdatePasswordDto
    ): Promise<User>
    {
        if (updateUserPassword.password !== updateUserPassword.password_confirm) {
            throw new BadRequestException('Password do not match!');
        }

        const user = await this.userRepository.findOne({
            where: {
                id: id,
            }
        });

        if (!user) {
            throw new NotFoundException('User does not exist')
        }

        const isMatch = await bcrypt.compare(updateUserPassword.password, user.password);

        if (isMatch) {
            throw new BadRequestException('New password must be different from previous password')
        }

        user.password = await bcrypt.hash(updateUserPassword.password, 12);

        return this.userRepository.findOne({id});
    }

}
