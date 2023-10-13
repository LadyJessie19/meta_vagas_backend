import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { VacancyService } from './vacancy.service';
import { updateVacancyDto } from './dto/update-vacancy.dto';
import { AuthGuard } from '../auth/guards/auth.guards';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Vacancy')
@UseGuards(AuthGuard)
@Controller('vacancies')
export class VacancyController {
  constructor(private readonly vacancyService: VacancyService) {}

  @Post()
  async create(@Request() req, @Body() payload) {
    const advertiserId = req.user.sub;
    return this.vacancyService.createVacancy(payload, advertiserId);
  }

  @Get('all')
  findAllVacancies(@Body() filter: updateVacancyDto) {
    return this.vacancyService.findVacancies(filter);
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
}
