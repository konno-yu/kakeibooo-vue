import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Foodstaff } from './foodstaffs/foodStaff.entity';

export const config: TypeOrmModuleOptions = {
    type: 'postgres',
    username: 'postgres',
    password: 'postgres',
    port: 5432,
    host: 'localhost',
    database: 'kakeibooo',
    synchronize: true,
    entities: [Foodstaff],
    logging: false,//true,
    namingStrategy: new SnakeNamingStrategy()
};