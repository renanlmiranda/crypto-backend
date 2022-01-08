/* eslint-disable no-bitwise */
import { Controller, Post, Body, Authorized } from 'routing-controllers';
import { login } from './login.repository';
import { iLoginBody } from './login.types';

@Controller('/login')
export default class LoginController {
  @Post('/')
  async create(@Body() body: iLoginBody) {
    const data = login(body);
    return data;
  }
}
