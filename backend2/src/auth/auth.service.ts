// auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(login: string, pass: string): Promise<any> {
    // validacion si es un email o un username
    let user: { password: string; toObject: () => any } | null = null;

    //validacion de email simple
    const emailRegex = /\S+@\S+\.\S+/;
    const isEmail = emailRegex.test(login);

    if (isEmail) {
      // Buscar por email
      user = await this.usersService.findByEmail(login);
    } else {
      // Buscar por username
      user = await this.usersService.findByUsername(login);
    }

    if (!user) {
      throw new UnauthorizedException('Usuario/Email no encontrado');
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    
    // Retornar el usuario sin password
    const { password, ...result } = user.toObject();
    return result;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
