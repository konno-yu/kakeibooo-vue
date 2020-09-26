import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './orm.config';
import { FoodstaffsModule } from './foodstaffs/foodstaffs.module';
import { ReceiptsModule } from './receipts/receipts.module';

@Module({
  imports: [TypeOrmModule.forRoot(config), FoodstaffsModule, ReceiptsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
