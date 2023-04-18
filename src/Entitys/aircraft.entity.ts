import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, PrimaryColumn, JoinColumn, OneToMany, ManyToMany, JoinTable } from "typeorm"
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

    @ManyToMany(() => Portfolio, portfolio => portfolio.aircrafts)
    @JoinTable()
    portfolio: Portfolio[];

}