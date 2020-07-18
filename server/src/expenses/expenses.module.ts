import { Module } from '@nestjs/common';
import { Expenses } from './expenses.entity';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [ TypeOrmModule.forFeature([Expenses])],
    controllers: [ExpensesController],
    providers: [ExpensesService]
})
export class ExpensesModule {}
