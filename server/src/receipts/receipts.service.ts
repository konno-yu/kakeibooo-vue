import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Receipts } from "./receipts.entity";
import { Repository, getConnection, createQueryBuilder } from "typeorm";
import { ReceiptsDto } from "./receipts.dto";
import { request } from "http";


@Injectable()
export class ReceiptsService {
    constructor(
        @InjectRepository(Receipts) private receiptsRepository: Repository<Receipts>
    ){}

    async getAll() {
        return await this.receiptsRepository.find({order: {id: 'DESC'}});
    }

    async postAll(requestBody: Partial<ReceiptsDto>[]) {
        // 複数件まとめて追加するためQuery Builderを利用
        await getConnection().createQueryBuilder().insert().into(Receipts).values(requestBody).execute();
        return requestBody;
    }

    async post(requestBody: Partial<ReceiptsDto>) {
        console.log("post");
        await getConnection().createQueryBuilder().insert().into(Receipts).values(requestBody).execute();
        return requestBody;
    }

    async update(requestBody: Partial<ReceiptsDto>) {
        await createQueryBuilder().update(Receipts).set({ store: requestBody.store, expense: requestBody.expense}).where({id: requestBody.id}).execute();
        return requestBody;
    }

    async getByMonth(month: number) {
        // ある月の日付だけを引き抜くためのクエリ文字列
        const sqlString = 'EXTRACT(MONTH FROM purchase_date) = :target_month;'
        const condition = { target_month: month};
        return await getConnection().createQueryBuilder(Receipts, "receipts").where(sqlString, condition).getMany();
    }

    async deleteById(id: number) {
        await this.receiptsRepository.delete({id});
        return this.receiptsRepository.count({ where: {id}});
    }
}