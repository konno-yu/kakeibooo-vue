import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity('receipts')
export class Receipts {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @CreateDateColumn({nullable: false})
    purchaseDate: Date;
    @Column({type: 'varchar', length: 100, nullable: false})
    store: string;
    @Column({type: 'integer', nullable: false})
    expense: number;
}