import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { FoodstaffsService } from './foodstaffs.service';
import { FoodstaffDto } from './foodstaff.dto';

@Controller('foodstaffs')
export class FoodstaffsController {
    constructor(private foodStaffService: FoodstaffsService) {}

    @Get()
    getAll() {
        return this.foodStaffService.getAll();
    }

    @Get(':id')
    getById(@Param('id') id: number) {
        return this.foodStaffService.getById(id);
    }

    @Post()
    post(@Body() data: FoodstaffDto) {
        return this.foodStaffService.post(data);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() data: Partial<FoodstaffDto>) {
        return this.foodStaffService.update(id, data);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.foodStaffService.delete(id);
    }
}
