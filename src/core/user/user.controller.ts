/* eslint-disable no-bitwise */
import {
  Controller,
  Post,
  Body,
  Authorized,
  Param,
  Put,
} from 'routing-controllers';
import { UserRepository } from './user.repository';
import {
  iBodyCreateUser,
  iUpdatePasswordUser,
  iUpdateUser,
} from './user.types';

@Controller('/users')
export default class CryptoController {
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
}
