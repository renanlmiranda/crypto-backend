/* eslint-disable import/prefer-default-export */
/* eslint-disable no-bitwise */
import { Controller, Post, Body } from 'routing-controllers';
import { container } from 'tsyringe';
import { LoginService } from '../services/Login.service';

@Controller('/login')
export class LoginController {
  @Post('/')
  async create(@Body() body) {
    const loginService = container.resolve(LoginService);
    return loginService.execute(body);
  }
}
