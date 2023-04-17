import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { Aircraft } from "./aircraft.entity"
import { Airport } from "./airport.entity"

@Entity()
export class FlightData {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    flight_number: string

    @ManyToOne(type=> Aircraft, aircraft => aircraft.registrationCode)
    registration: Aircraft
    
    @ManyToOne(type=> Airport, airport => airport.depatureFlights)
    @JoinColumn()
    departure_airport: Airport

    @ManyToOne(type=> Airport, airport => airport.destinationFlights)
    @JoinColumn()
    arrival_airport: Airport

    @Column()
    departure_timestamp: number

    @Column()
    arrival_timestamp: number
} 