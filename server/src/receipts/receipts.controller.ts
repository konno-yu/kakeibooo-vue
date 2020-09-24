import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ReceiptsService } from './receipts.service';
import { ReceiptsDto } from './receipts.dto';
import { UpdateDateColumn } from 'typeorm';

@Controller('receipts')
export class ReceiptsController {
    constructor(private receiptsService: ReceiptsService) {}

    @Get()
    getAll() {
        return this.receiptsService.getAll();
    }

    @Post()
    post(@Body() requestBody: Partial<ReceiptsDto>) {
        console.log("post controller");
        return this.receiptsService.post(requestBody);
    }

    @Post('all')
    postAll(@Body() requestBody: Partial<ReceiptsDto>[]) {
        console.log("post all controller");
        return this.receiptsService.postAll(requestBody);
    }

    @Put()
    update(@Body() requestBody: Partial<ReceiptsDto>) {
        return this.receiptsService.update(requestBody);
    }

    @Get(':month')
    getByMonth(@Param('month') month: number) {
        return this.receiptsService.getByMonth(month);
    }

    @Delete(':id')
    deleteById(@Param('id') id: number) {
        return this.receiptsService.deleteById(id);
    }
}
