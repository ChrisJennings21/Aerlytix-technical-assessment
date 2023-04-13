import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class aircraftType {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    aircraftType: string
}