import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { aircraft } from "./aircraft.entity"

@Entity()
export class portfolioAircraft {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    portfolioID: number;

    @ManyToOne(type=> aircraft, aircraftID => aircraftID.id)
    aircraftID: number;
}