import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const config: TypeOrmModuleOptions = {
    type: 'postgres',
    username: 'postgres',
    password: 'postgres',
    port: 5432,
    host: 'localhost',
    database: 'kakeibooo',
    synchronize: true,
    entities: ['dist/**/*.entity.js'],
    logging: true,
    namingStrategy: new SnakeNamingStrategy()
};