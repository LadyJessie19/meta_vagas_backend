import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBasicAuth, ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { RoleEnum } from '../enums/user-roles.enum';
import { Roles } from '../decorators/role.decorators';
import { CurrentUser, TokenUser } from '../decorators/current.User.decorators';
import { CurrentUserDto } from './dto/current-user.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AuthGuard } from '../auth/guards/auth.guards';
import { JwtInterceptor } from '../auth/jwt/jwt.interceptor';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiExcludeEndpoint()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // @UseInterceptors(JwtInterceptor) //This is getting the token from the context headers authorization
  // @UseGuards(RolesGuard, AuthGuard)
  // @Roles(RoleEnum.ADMIN) //This is seting the ROLES_KEYS as admin role
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  // @UseInterceptors(JwtInterceptor)
  // @UseGuards(RolesGuard)
  // @Roles(RoleEnum.ADMIN)
  @Get(':id/profile')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  // @UseGuards(RolesGuard)
  // @ApiBasicAuth()
  @Get('profile')
  async getProfile(@CurrentUser() currentUser: CurrentUserDto) {
    return this.userService.findById(currentUser.sub);
  }

  // @UseInterceptors(JwtInterceptor)
  // @UseGuards(RolesGuard)
  // @Roles(RoleEnum.ADMIN)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @TokenUser() currentUser: CurrentUserDto,
  ) {
    console.log(currentUser);
    return this.userService.update(+id, updateUserDto);
  }

  // @UseGuards(RolesGuard)
  @Delete(':id/soft-delete')
  async remove(@Param('id') id: string) {
    return await this.userService.remove(+id);
  }

  // @UseGuards(RolesGuard)
  @Post(':id/restore')
  async restore(@Param('id') id: string) {
    return await this.userService.restore(+id);
  }
}
