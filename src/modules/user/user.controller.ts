import {
    Controller,
    Get,
    Put,
    Body, 
    Post, 
    Param,
} from '@nestjs/common';

import { User } from './user.entity';
import { UsersService } from './user.service';
import { UserCreateDto } from './dto/user-create.dto';
import { UpdateUserDto } from 'src/modules/user/dto/user-update.dto';

@Controller('users')
export class UserController {
    constructor(private usersService: UsersService,) {}

    @Post()
    async create(@Body() userCreateDto: UserCreateDto): Promise<User> {
       return this.usersService.create(userCreateDto)
    }

    @Get(':id')
     async findOne(@Param('id') id: string) {
       return this.usersService.findById(id);
    }

    // @Patch(':id')
    @Put('me/update')
     async update(@Param('id') id: string, @Body() userUpdateDto: UpdateUserDto) {
       return this.usersService.update(id, userUpdateDto);
   }

}
