import { Injectable } from '@nestjs/common';
import { Expenses } from './expenses.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryBuilder, createQueryBuilder, createConnection, getConnection } from 'typeorm';
import { ExpensesDto } from './expenses.dto';

@Injectable()
export class ExpensesService {
    constructor(
        @InjectRepository(Expenses) private expensesRepository: Repository<Expenses>
    ){}

    /**
     * 登録された全ての日の食費を取得する
     */
    async getAll() {
        return await this.expensesRepository.find({order: {id: 'ASC'}});
    }

    /**
     * 引数で指定した月の食費を取得する
     * @param month 月
     */
    async getByMonth(month: number) {
        // ある月の日付だけを引き抜くためのクエリ文字列
        const sqlString = 'EXTRACT(MONTH FROM target_date) = :target_month;'
        const condition = { target_month: month};
        return await getConnection().createQueryBuilder(Expenses, "expenses").where(sqlString, condition).getMany();
    }

    /**
     * 引数で指定した年月日の食費を取得する
     * @param year 年
     * @param month 月
     * @param date 日
     */
    async getByDate(year: number, month: number, date: number) {
        // 日付が1桁の場合に0埋めして桁を揃えるメソッド
        const zeroPadding = (num, length) => ('0000000000' + num).slice(-length);
        const targetDate = year + '-' + zeroPadding(month, 2) + '-' + zeroPadding(date, 2);
        return await this.expensesRepository.findOne({where: {targetDate: targetDate}});
    }

    /**
     * 食費を新規登録する
     * @param data 年月日と食費を含むオブジェクト
     */
    async post(data: ExpensesDto) {
        const expenses = this.expensesRepository.create(data);
        await this.expensesRepository.save(expenses);
        return expenses;
    }

    /**
     * 食費を更新する
     * @param id 食費テーブルのレコードID
     * @param data 食費を含むオブジェクト
     */
    async update(id: number, data: Partial<ExpensesDto>) {
        await this.expensesRepository.update({ id }, data);
        return this,this.expensesRepository.findOne({ where: { id: id } });
    }
}
