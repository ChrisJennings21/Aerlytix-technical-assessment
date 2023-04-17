import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Aircraft } from 'src/Entitys/aircraft.entity';
import { Airport } from 'src/Entitys/airport.entity';
import { FlightData } from 'src/Entitys/flightData.entity';
import { Repository } from 'typeorm';

export interface flightDataInterface {
    flight_number: string;
    registration: Aircraft;
    departure_airport: Airport;
    arrival_airport: Airport;
    departure_timestamp: number;
    arrival_timestamp: number
}


@Injectable()
export class FlightDataService {

    constructor(@InjectRepository(FlightData)
    private flightDataRepository: Repository<FlightData>,@InjectRepository(Airport)
    private airportRepository: Repository<Airport>,@InjectRepository(Aircraft)
    private aircraftRepository: Repository<Aircraft>) { }

    async create(flightData: flightDataInterface) {
        flightData.departure_airport = await this.airportRepository.findOne({ where: { airportCode :  flightData.departure_airport.toString()} })
        flightData.arrival_airport = await this.airportRepository.findOne({ where: { airportCode :  flightData.arrival_airport.toString()} })
        flightData.registration = await this.aircraftRepository.findOne({ where: { registrationCode :  flightData.registration.toString()} })
        return await this.flightDataRepository.save(flightData)
    }
}