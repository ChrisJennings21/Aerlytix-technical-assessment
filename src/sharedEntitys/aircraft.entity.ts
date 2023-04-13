import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne } from "typeorm"
import { aircraftType } from "./aircraftType.entity"

@Entity()
export class aircraft {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    registrationCode: string

    // foreign key to the aircraftType table
    @ManyToOne(type=> aircraftType, aircraftTypeID => aircraftTypeID.id)
    aircraftTypeID: number

}