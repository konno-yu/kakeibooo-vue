import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './orm.config';
import { FoodstaffsModule } from './foodstaffs/foodstaffs.module';
import { ExpensesController } from './expenses/expenses.controller';
import { ExpensesService } from './expenses/expenses.service';
import { ExpensesModule } from './expenses/expenses.module';

@Module({
  imports: [TypeOrmModule.forRoot(config), FoodstaffsModule, ExpensesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
