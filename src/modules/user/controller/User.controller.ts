/* eslint-disable import/prefer-default-export */
/* eslint-disable no-bitwise */
import {
  Controller,
  Post,
  Body,
  Authorized,
  Param,
  Put,
  Get,
  Delete,
} from 'routing-controllers';
import { container } from 'tsyringe';
import { UsersRepository } from '../repository/User.repository';
import { ChangePasswordService } from '../services/ChangePassword.service';
import { CreateUsersService } from '../services/CreateUsers.service';
import { UpdateUserService } from '../services/UpdateUsers.service';
import { DeleteUsersService } from '../services/DeleteUsers.service';

const usersRepository = new UsersRepository();
@Controller('/users')
export class UsersController {
  @Post('/')
  async create(@Body() body) {
    const createUserService = container.resolve(CreateUsersService);
    return createUserService.execute(body);
  }

  @Authorized()
  @Put('/:id')
  async update(@Body() body, @Param('id') id: number) {
    const updateUserService = container.resolve(UpdateUserService);
    return updateUserService.execute(id, body);
  }

  @Authorized()
  @Put('/password/:id')
  async updatePassword(@Body() body, @Param('id') id: number) {
    const changePasswordService = container.resolve(ChangePasswordService);
    return changePasswordService.execute(id, body);
  }

  @Authorized()
  @Get('/:id')
  async findOne(@Param('id') id: number) {
    return usersRepository.findOne(id);
  }

  @Authorized()
  @Delete('/:id')
  async delete(@Param('id') id: number) {
    const deleteUsersService = container.resolve(DeleteUsersService);
    return deleteUsersService.execute(id);
  }
}
