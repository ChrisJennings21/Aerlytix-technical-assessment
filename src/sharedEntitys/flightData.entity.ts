import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { aircraft } from "./aircraft.entity"
import { airport } from "./airport.entity"

@Entity()
export class flightData {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    flightNumber: string

    // this is foreign key to the aircraft table
    @ManyToOne(type=> aircraft, aircraftID => aircraftID.id)
    aircraftID: number
    
    // this is foreign key to the airport table
    @ManyToOne(type=> airport, deparetureAirportID => deparetureAirportID.id)
    deparetureAirportID: number
    // this is foreign key to the airport table

    @ManyToOne(type=> airport, destinationAirportID => destinationAirportID.id)
    destinationAirportID: number

    @Column()
    arrivalTimestamp: number

}