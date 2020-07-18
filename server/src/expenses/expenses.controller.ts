import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesDto } from './expenses.dto';

@Controller('expenses')
export class ExpensesController {
    constructor(private expensesService: ExpensesService) {}

    @Get()
    getAll() {
        return this.expensesService.getAll();
    }

    @Get(':month')
    getByMonth(@Param('month') month: number) {
        return this.expensesService.getByMonth(month);
    }

    @Get(':year/:month/:date')
    getByDate(@Param('year') year: number, @Param('month') month: number, @Param('date') date: number) {
        return this.expensesService.getByDate(year, month, date);
    }

    @Post()
    post(@Body() data: ExpensesDto) {
        return this.expensesService.post(data);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() data: Partial<ExpensesDto>) {
        return this.expensesService.update(id, data);
    }
}
