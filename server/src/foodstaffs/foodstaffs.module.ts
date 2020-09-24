import { Module } from '@nestjs/common';
import { FoodstaffsController } from './foodstaffs.controller';
import { FoodstaffsService } from './foodstaffs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Foodstaffs } from './foodstaffs.entity';

@Module({
    imports: [ TypeOrmModule.forFeature([Foodstaffs])],
    controllers: [FoodstaffsController],
    providers: [FoodstaffsService]
})
export class FoodstaffsModule {}
