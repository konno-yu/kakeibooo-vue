import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receipts } from './receipts.entity';
import { ReceiptsController } from './receipts.controller';
import { ReceiptsService } from './receipts.service';

@Module({
    imports: [TypeOrmModule.forFeature([Receipts])],
    controllers: [ReceiptsController],
    providers: [ReceiptsService]
})
export class ReceiptsModule {}
