import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { FlightData } from "./flightData.entity"

@Entity()
export class Airport {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    airportCode: string;

    @OneToMany(() => FlightData, flightData => flightData.departure_airport)
    depatureFlights : FlightData[];

    @OneToMany(() => FlightData, flightData => flightData.arrival_airport)
    destinationFlights : FlightData[];
}