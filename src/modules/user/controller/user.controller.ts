/* eslint-disable no-bitwise */
import {
  Controller,
  Post,
  Body,
  Authorized,
  Param,
  Put,
  Get,
} from 'routing-controllers';
import { prisma } from '../../../database/prisma';
import { UsersRepository } from '../repository/User.repository';
import { ChangePasswordService } from '../services/ChangePassowrd.service';
import { CreateUserService } from '../services/CreateUser.service';
import { UpdateUserService } from '../services/UpdateUser.service';

const usersRepository = new UsersRepository(prisma.users);
const createUserService = new CreateUserService(usersRepository);
const updateUserService = new UpdateUserService(usersRepository);
const changePassword = new ChangePasswordService(usersRepository);

@Controller('/users')
export default class UserController {
  @Post('/')
  async create(@Body() body) {
    return createUserService.execute(body);
  }

  @Authorized()
  @Put('/:id')
  async update(@Body() body, @Param('id') id): Promise<any> {
    return updateUserService.execute(id, body);
  }

  @Authorized()
  @Put('/password/:id')
  async updatePassword(@Body() body, @Param('id') id): Promise<any> {
    return changePassword.execute(id, body);
  }

  @Authorized()
  @Get('/:id')
  async findOne(@Param('id') id: number): Promise<any> {
    return usersRepository.findOne(id);
  }
}
