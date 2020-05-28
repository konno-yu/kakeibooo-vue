import { Injectable, Get, Post, Put, Delete } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Foodstaff } from './foodStaff.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FoodstaffDTO } from './foodstaff.dto';

@Injectable()
export class FoodstaffsService {
    constructor(
        @InjectRepository(Foodstaff) private foodstaffRepository: Repository<Foodstaff>
    ){}
    
    async getAllStaffs() {
        return await this.foodstaffRepository.find();
    }

    async getStaffById(id: number) {
        return await this.foodstaffRepository.findOne({where: {id: id}});
    }

    async postStaff(data: FoodstaffDTO) {
        const staff = this.foodstaffRepository.create(data);
        await this.foodstaffRepository.save(staff);
        return staff;
    }

    async updateStaff(id: number, data: Partial<FoodstaffDTO>) {
        await this.foodstaffRepository.update({id}, data);
        return this.foodstaffRepository.findOne({where: {id: id}});
    }

    async deleteStaff(id: number) {
        await this.foodstaffRepository.delete({id});
        return { deleted: true };
    }

}
