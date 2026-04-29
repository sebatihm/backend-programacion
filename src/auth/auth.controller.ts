import { Body, Controller, Post, Res } from '@nestjs/common';
import express from 'express';
import { AuthService } from './auth.service';
import { LoginForm } from './dto/login.dto';
import { Public } from './dto/decorators/public.decorator';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @Public()
  async login(
    @Body() loginForm: LoginForm,
    @Res({ passthrough: true }) response: express.Response,
  ) {
    const token = await this.authService.login(loginForm);
    response.cookie('token', token, { httpOnly: true, secure: true });

    return {
      message: 'Inicio de sesion realizado correctamente',
      data: {
        token,
      },
    };
  }
}
