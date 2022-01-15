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
import { UserRepository } from './user.repository';
import {
  iBodyCreateUser,
  iUpdatePasswordUser,
  iUpdateUser,
} from './user.types';

@Controller('/users')
export default class UserController {
  @Post('/')
  async create(@Body() body: iBodyCreateUser) {
    const data = await UserRepository.createUser(body);
    return data;
  }

  @Authorized()
  @Put('/:id')
  async update(
    @Body() body: iUpdateUser,
    @Param('id') id: number,
  ): Promise<any> {
    const updatedUser = UserRepository.updateUser(id, body);

    return updatedUser;
  }

  @Authorized()
  @Put('/password/:id')
  async updatePassword(
    @Body() body: iUpdatePasswordUser,
    @Param('id') id: number,
  ): Promise<any> {
    const updatedUser = UserRepository.updatePassword(id, body);

    return updatedUser;
  }

  @Authorized()
  @Get('/:id')
  async findOne(@Param('id') id: number): Promise<any> {
    const user = UserRepository.findOne(id);

    return user;
  }
}
