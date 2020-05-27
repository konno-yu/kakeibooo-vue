import { Module } from '@nestjs/common';
import { FoodstaffsController } from './foodstaffs.controller';
import { FoodstaffsService } from './foodstaffs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Foodstaff } from './foodstaff.entity';

@Module({
    imports: [ TypeOrmModule.forFeature([Foodstaff])],
    controllers: [FoodstaffsController],
    providers: [FoodstaffsService]
})
export class FoodstaffsModule {}
