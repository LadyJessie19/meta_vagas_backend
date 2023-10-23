import {
  Controller,
  Post,
  Body,
  Query,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
  Request,
  ParseIntPipe,
  HttpException,
  HttpStatus,
  Res,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { VacancyService } from './vacancy.service';
import { updateVacancyDto } from './dto/update-vacancy.dto';
import { AuthGuard } from '../auth/guards/auth.guards';
import { postVacancyType } from './dto/post-vacancy.type';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtInterceptor } from '../auth/jwt/jwt.interceptor';
import { RoleEnum } from '../enums/user-roles.enum';
import { Roles } from '../decorators/role.decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@UseGuards(AuthGuard)
@Controller('vacancies')
export class VacancyController {
  constructor(private readonly vacancyService: VacancyService) {}

  @Post()
  async create(@Request() req, @Body() payload: postVacancyType) {
    const advertiserId = req.user.sub;
    return this.vacancyService.createVacancy(
      payload.payload,
      payload.userEmail,
      payload.companyId,
      payload.technologies,
    );
  }

  @Get()
  findAllVacancies(
    @Body() filter: updateVacancyDto,
    @Query('page') page = 1,
    @Query('limit') limit = 5,
    @Query('tech') tech = '',
    @Query('role') role = '',
    @Query('wageMax') maxWage = 10000,
    @Query('wageMin') minWage = 0,
    @Query('type') type = '',
    @Query('local') local = '',
    @Query('description') description = '',
  ) {
    return this.vacancyService.findVacancies(
      page,
      limit,
      tech,
      role,
      maxWage,
      minWage,
      type,
      local,
      description,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: number, @Body() filter: { userName: string }) {
    const userName = filter.userName;
    return this.vacancyService.findVacancyById({ id, userName });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() payload: updateVacancyDto) {
    return this.vacancyService.updateVacancy(+id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vacancyService.deleteVacancy(+id);
  }

  @UseInterceptors(JwtInterceptor)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([RoleEnum.ADVERTISER, RoleEnum.ADMIN])
  @Post('createVacanciesAPartirFromXLSX')
  @UseInterceptors(FileInterceptor('file'))
  async createVacanciesAPartirFromXLSX(
    @UploadedFile() file,
    @Res() res: Response,
  ) {
    const vacancy = await this.vacancyService.createVacanciesAPartirFromXLSX(
      file,
      file.buffer,
    );

    return res.status(200).json({
      createdCount: vacancy.length,
      originalname: file.originalname,
      filename: file.filename,
    });
  }
}
