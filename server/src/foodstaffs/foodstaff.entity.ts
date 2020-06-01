import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";


 @Entity('foodstaffs')
 export class Foodstaff {
     @PrimaryGeneratedColumn('increment')
     id: number;
     @Column({type: 'varchar', length: 100, nullable: false, unique: true})
     staffName: string;
     @Column({type: 'integer', nullable: false})
     staffCount: number;
     @Column({type: 'varchar', length: 10, nullable: false})
     unit: string;
     @CreateDateColumn({nullable: false})
     inputDate: Date;
     @Column({type: 'varchar', length: 20, nullable: false})
     category: string;
     @Column({type: 'varchar', length: 20, nullable: true})
     subCategory: string;
 }