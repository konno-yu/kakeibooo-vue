import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Foodstaffs } from './foodstaffs/foodstaffs.entity';
import { Receipts } from './receipts/receipts.entity';

export const config: TypeOrmModuleOptions = {
    type: 'postgres',
    username: 'postgres',
    password: 'postgres',
    port: 5432,
    host: 'localhost',
    database: 'kakeibooo',
    synchronize: false,
    entities: [Foodstaffs, Receipts],
    logging: true,
    namingStrategy: new SnakeNamingStrategy()
};