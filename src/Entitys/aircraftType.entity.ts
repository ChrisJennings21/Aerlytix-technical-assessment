import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Aircraft } from "./aircraft.entity"

@Entity()
export class AircraftType {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    aircraftType: string;

    @OneToMany(() => Aircraft, aircraft => aircraft.aircraftType)
    aircrafts : Aircraft[];
}