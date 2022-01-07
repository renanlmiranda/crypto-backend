/* eslint-disable no-bitwise */
import { Controller, Post, Body } from 'routing-controllers';
import { createUser } from './user.repository';
import { iBodyCreateUser } from './user.types';

@Controller('/users')
export default class CryptoController {
  @Post('/')
  async create(@Body() body: iBodyCreateUser) {
    const data = await createUser(body);
    return data;
  }
}
