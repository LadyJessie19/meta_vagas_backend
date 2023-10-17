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
} from '@nestjs/common';
import { VacancyService } from './vacancy.service';
import { updateVacancyDto } from './dto/update-vacancy.dto';
import { AuthGuard } from 'src/guards/auth.guards';

@Controller('vacancy')
export class VacancyController {
    constructor(
        private readonly vacancyService: VacancyService,
    ) { }

    @UseGuards(AuthGuard)
    @Post()
    async create(@Request() req, @Body() payload) {
        const advertiserId = req.user.sub;
        return this.vacancyService.createVacancy(payload, advertiserId);
    }

    @Get()
    findAllVacancies(@Body() filter: updateVacancyDto,
    @Query("page") page = 1,
    @Query("limit") limit = 5,
    @Query("tech") tech = "",
    @Query("role") role="",
    @Query("wageMax") maxWage = 10000,
    @Query("wageMin") minWage = 0,
    @Query("type") type = "",
    @Query("local") local = "",
    @Query("description") description="") {
        return this.vacancyService.findVacancies(page, limit, tech, role, maxWage, minWage, type, local, description);
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    findOne(@Param('id') id: number, @Body()  filter : {userName: string}) {
        const userName = filter.userName
        return this.vacancyService.findVacancyById({ id, userName });
    }

    @UseGuards(AuthGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() payload: updateVacancyDto) {
        return this.vacancyService.updateVacancy(+id, payload);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.vacancyService.deleteVacancy(+id);
    }
}
