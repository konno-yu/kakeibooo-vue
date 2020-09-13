import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { FoodstaffsService } from './foodstaffs.service';
import { FoodstaffsDto } from './foodstaffs.dto';

@Controller('foodstaffs')
export class FoodstaffsController {
    constructor(private foodStaffsService: FoodstaffsService) {}

    @Get()
    getAll() {
        return this.foodStaffsService.getAll();
    }

    @Get(':id')
    getById(@Param('id') id: number) {
        return this.foodStaffsService.getById(id);
    }

    @Post()
    post(@Body() data: FoodstaffsDto) {
        return this.foodStaffsService.post(data);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() data: Partial<FoodstaffsDto>) {
        return this.foodStaffsService.update(id, data);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.foodStaffsService.delete(id);
    }
}
