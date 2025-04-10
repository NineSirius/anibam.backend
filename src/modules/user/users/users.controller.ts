import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { GetUserFiltersDto } from './dto/get-user-filters.dto';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @Post()
  create(@Body() userDto: CreateUserDto): any {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Получение всех пользователей' })
  @Get()
  getAll(@Query() filters: GetUserFiltersDto) {
    return this.usersService.getAllUsers(filters);
  }

  // @ApiOperation({ summary: 'Получение пользователя по ID' })
  // @Get(':id')
  // findById(@Param('id') id: string) {
  //   return this.usersService.getById(+id);
  // }

  @ApiOperation({ summary: 'Получение пользователя по username' })
  @Get(':username')
  findByUsername(@Param('username') username: string) {
    return this.usersService.getUserByUsername(username);
  }

  @ApiOperation({ summary: 'Удаление пользователя' })
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.deleteByid(+id);
  }
}
