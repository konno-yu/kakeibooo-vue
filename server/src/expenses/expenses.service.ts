import { Injectable } from '@nestjs/common';
import { Expenses } from './expenses.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryBuilder, createQueryBuilder, createConnection, getConnection } from 'typeorm';

@Injectable()
export class ExpensesService {
    constructor(
        @InjectRepository(Expenses) private expensesRepository: Repository<Expenses>
    ){}

    async getAll() {
        return await this.expensesRepository.find({order: {id: 'ASC'}});
    }

    async getByMonth(month: number) {
        const sqlString = 'EXTRACT(MONTH FROM target_date) = :target_month;'
        const condition = { target_month: month};
        return await getConnection().createQueryBuilder(Expenses, "expenses").where(sqlString, condition).getMany();
    }
}
