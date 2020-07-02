import { Controller, Get, Param } from '@nestjs/common';
import { ExpensesService } from './expenses.service';

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
}
