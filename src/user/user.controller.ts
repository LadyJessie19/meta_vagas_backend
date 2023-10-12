import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBasicAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntityDoc } from '../docs/user/user-entity.doc';
import { CreateUserDoc } from '../docs/user/create-user.doc';
import { RoleEnum } from '../enums/user-roles.enum';
import { Roles } from '../decorators/role.decorators';
import { CurrentUser } from '../decorators/current.User.decorators';
import { CurrentUserDto } from './dto/current-user.dto';
import { RolesGuard } from '../auth/guards/roles.guard';

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
    return this.userService.create(createUserDto);
  }
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @Get()
  async findAll() {
    return this.userService.findAll();
  }
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @Get(':id/profile')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @UseGuards(RolesGuard)
  @ApiBasicAuth()
  @Get('profile')
  async getProfile(@CurrentUser() currentUser: CurrentUserDto) {
    return this.userService.findById(currentUser.sub);
  }

  @UseGuards(RolesGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
  @UseGuards(RolesGuard)
  @Delete(':id/soft-delete')
  async remove(@Param('id') id: string) {
    return await this.userService.remove(+id);
  }
  @UseGuards(RolesGuard)
  @Post(':id/restore')
  async restore(@Param('id') id: string) {
    return await this.userService.restore(+id);
  }
}
