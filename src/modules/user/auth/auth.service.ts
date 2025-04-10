import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginData: LoginDto) {
    const user = await this.validateUser(loginData);
    return this.generateToken(user);
  }

  async register(registerData: RegisterDto) {
    const candidate = await this.userService.getUserByUsername(
      registerData.email,
    );
    if (candidate) {
      throw new HttpException('user already exists', 400);
    }
    const hashPass = await bcrypt.hash(registerData.password, 5);
    const user = await this.userService.createUser({
      ...registerData,
      password: hashPass,
    });
    return this.generateToken(user);
  }

  private generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return {
      access: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userData: LoginDto) {
    const user = await this.userService.getUserByUsername(userData.username);

    if (!user) {
      throw new HttpException('wrong login or password', 400);
    }

    const isPasswordValid = await bcrypt.compare(
      userData.password,
      user.password,
    );
    if (user && isPasswordValid) {
      return user;
    }
    throw new HttpException('wrong login or password', 400);
  }
}
