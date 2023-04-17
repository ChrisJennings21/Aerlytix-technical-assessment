import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, PrimaryColumn, JoinColumn, OneToMany, ManyToMany } from "typeorm"
import { AircraftType } from "./aircraftType.entity"
import { FlightData } from "./flightData.entity"
import { Portfolio } from "./portfolio.entity";

@Entity()
export class Aircraft {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    registrationCode: string

    // foreign key to the aircraftType table
    @ManyToOne(() => AircraftType, aircraftType => aircraftType.aircrafts)
    @JoinColumn()
    aircraftType: AircraftType;

    @OneToMany(() => FlightData, flightData => flightData.registration)
    flightData: FlightData[];

    @ManyToOne(() => Portfolio, portfolio => portfolio.aircrafts)
    portfolio: Portfolio;

}