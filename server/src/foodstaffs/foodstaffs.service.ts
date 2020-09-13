import { Injectable, Get, Post, Put, Delete } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Foodstaffs } from './foodstaffs.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FoodstaffsDto } from './foodstaffs.dto';

@Injectable()
export class FoodstaffsService {
    constructor(
        @InjectRepository(Foodstaffs) private foodstaffsRepository: Repository<Foodstaffs>
    ){}

    async getAll() {
        return await this.foodstaffsRepository.find({order: {id: 'DESC'}});
    }

    async getById(id: number) {
        return await this.foodstaffsRepository.findOne({where: {id: id}});
    }

    async post(data: FoodstaffsDto) {
        const staff = this.foodstaffsRepository.create(data);
        staff.inputDate = new Date();
        await this.foodstaffsRepository.save(staff);
        return staff;
    }

    async update(id: number, data: Partial<FoodstaffsDto>) {
        await this.foodstaffsRepository.update({id}, data);
        return this.foodstaffsRepository.findOne({where: {id: id}});
    }

    async delete(id: number) {
        await this.foodstaffsRepository.delete({id});
        return { deleted: true };
    }

}
