import { Injectable, Get, Post, Put, Delete } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Foodstaff } from './foodStaff.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FoodstaffDto } from './foodstaff.dto';

@Injectable()
export class FoodstaffsService {
    constructor(
        @InjectRepository(Foodstaff) private foodstaffRepository: Repository<Foodstaff>
    ){}

    async getAll() {
        return await this.foodstaffRepository.find({order: {id: 'DESC'}});
    }

    async getById(id: number) {
        return await this.foodstaffRepository.findOne({where: {id: id}});
    }

    async post(data: FoodstaffDto) {
        const staff = this.foodstaffRepository.create(data);
        staff.inputDate = new Date();
        await this.foodstaffRepository.save(staff);
        return staff;
    }

    async update(id: number, data: Partial<FoodstaffDto>) {
        await this.foodstaffRepository.update({id}, data);
        return this.foodstaffRepository.findOne({where: {id: id}});
    }

    async delete(id: number) {
        await this.foodstaffRepository.delete({id});
        return { deleted: true };
    }

}
