import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { FoodstaffsService } from './foodstaffs.service';
import { FoodstaffDTO } from './foodstaff.dto';

@Controller('foodstaffs')
export class FoodstaffsController {
    constructor(private foodStaffService: FoodstaffsService) {}

    @Get()
    getAllStaffs() {
        return this.foodStaffService.getAllStaffs();
    }

    @Get(':id')
    getStaffById(@Param('id') id: number) {
        return this.foodStaffService.getStaffById(id);
    }

    @Post()
    postStaff(@Body() data: FoodstaffDTO) {
        return this.foodStaffService.postStaff(data);
    }

    @Put(':id')
    updateStaff(@Param('id') id: number, @Body() data: Partial<FoodstaffDTO>) {
        return this.foodStaffService.updateStaff(id, data);
    }

    @Delete(':id')
    deleteStaff(@Param('id') id: number) {
        return this.foodStaffService.deleteStaff(id);
    }
}
