import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(user: { email: string; password: string }) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    return this.userService.create({
      email: user.email,
      password: hashedPassword,
    });
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    return user; // Devuelve el usuario si la validación es exitosa
  }

  async login(user: any) {
    const validatedUser = await this.validateUser(user.email, user.password);
    const payload = { email: validatedUser.email, sub: validatedUser.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
