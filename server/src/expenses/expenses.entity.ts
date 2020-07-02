import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";


 @Entity('expenses')
 export class Expenses {
     @PrimaryGeneratedColumn('increment')
     id: number;
     @Column({type: 'date', nullable: false, unique: true})
     targetDate: Date;
     @Column({type: 'integer', nullable: false})
     cost: number;
     // TODO いずれは作ったご飯も登録できるようにしたい
 }