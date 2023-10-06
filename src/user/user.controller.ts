import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBasicAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntityDoc } from '../docs/users/user-entity.doc';
import { CreateUserDoc } from '../docs/users/create-user.doc';
import { CurrentUserDto } from './dto/current-user.dto';
import { Roles } from 'src/decorators/role.decorators';
import { RoleEnum } from 'src/enums/user-roles.enum';
import { CurrentUser } from 'src/decorators/current.user.decorators';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBody({
    type: CreateUserDoc,
  })
  @ApiResponse({
    type: UserEntityDoc,
  })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Roles(RoleEnum.ADMIN)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Roles(RoleEnum.ADMIN)
  @Get(':id/profile')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @ApiBasicAuth()
  @Get('profile')
  async getProfile(@CurrentUser() currentUser: CurrentUserDto) {
    return await this.userService.findById(currentUser.sub);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id/soft-delete')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Post(':id/restore')
  restore(@Param('id') id: string) {
    return this.userService.restore(+id);
  }
}