import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PostgresErrorCode } from 'src/helpers/postgresErrorCode.enum'
import { Repository } from 'typeorm'
import { compareHash, hash } from 'src/utils/bcrypt'

import Logging from 'src/library/Logging'
import { User } from './user.entity';
import {UserCreateDto} from 'src/modules/user/dto/user-create.dto'
import { UpdateUserDto } from 'src/modules/user/dto/user-update.dto'

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}

    async all(): Promise<User[]> {
        return await this.usersRepository.find();
    }

    async findOne(condition, relations = []): Promise<User> {
        return this.usersRepository.findOne(condition, {relations});
    }


    async findBy(condition):Promise<User>{
       return this.usersRepository.findOne({where: condition})
    }

    async findById(id: string): Promise<User> {
        const user = await this.usersRepository.findOne({ where: { id }})
        return user
    }

    async create(createUserDto: UserCreateDto): Promise<User> {
        const user = await this.findBy({ email: createUserDto.email })
        if (user) {
          throw new BadRequestException('User with that email already exists.')
        }
        try {
          const newUser = this.usersRepository.create({ ...createUserDto })
          return this.usersRepository.save(newUser)
        } catch (error) {
          Logging.error(error)
          throw new BadRequestException('Something went wrong while creating a new user.')
        }
      }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
            const user = (await this.findById(id)) as User
            const { email, password, confirm_password, ...data } = updateUserDto
            if(user.email !== email && email ) {
                user.email = email
            }
            if (password && confirm_password) {
                if (password !== confirm_password) {
                    throw new BadRequestException('Password do not match.')
                }
                if(await compareHash(password, user.password)) {
                    throw new BadRequestException('New password cannot be the same as your old password.')
                }
                user.password = await hash(password)
            }
            try {
                Object.entries(data).map((entry) => {
                    user[entry[0]] = entry[1]
                })
                return this.usersRepository.save(user)
            } catch (error) {
                Logging.error(error)
                if(error?.code === PostgresErrorCode.UniqueViolation) {
                    throw new BadRequestException('User with that email already exists.')
                }
                throw new InternalServerErrorException('Something went wrong while updating the user.')
            }
        }
}
