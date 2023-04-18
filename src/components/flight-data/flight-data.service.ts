import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Aircraft } from '../../Entitys/aircraft.entity';
import { Airport } from '../../Entitys/airport.entity';
import { FlightData } from '../../Entitys/flightData.entity';
import { Repository } from 'typeorm';

export interface flightDataInterface {
    flight_number: string;
    registration: any;
    departure_airport: any;
    arrival_airport: any;
    departure_timestamp: number;
    arrival_timestamp: number
}


@Injectable()
export class FlightDataService {

    constructor(@InjectRepository(FlightData)
    private flightDataRepository: Repository<FlightData>,@InjectRepository(Airport)
    private airportRepository: Repository<Airport>,@InjectRepository(Aircraft)
    private aircraftRepository: Repository<Aircraft>) { }

    async create(flightData: flightDataInterface) : Promise<FlightData>{
        // transform links into database entitys 
        flightData.departure_airport = await this.airportRepository.findOne({ where: { airportCode :  flightData.departure_airport.toString()}});
        flightData.arrival_airport = await this.airportRepository.findOne({ where: { airportCode :  flightData.arrival_airport.toString()} });
        flightData.registration = await this.aircraftRepository.findOne({ where: { registrationCode :  flightData.registration.toString()} });
        // check of the depature airport exists in db if not return error
        if(flightData.departure_airport == undefined){
            throw new BadRequestException(
                'Departure Airport does not exist in our records',
            ); 
        }
        // check if the arrival airport exists if not return error
        if(flightData.arrival_airport == undefined){
            throw new BadRequestException(
                'Arrival Airport does not exist in our records',
            ); 
        }
        // check if the airplane exists if not return error
        if(flightData.registration == undefined){
            throw new BadRequestException(
                'Registration does not exist in our records',
            ); 
        }
        // check if the airports are the same. If they are return error
        if(flightData.arrival_airport.airportCode == flightData.departure_airport.airportCode){
            throw new BadRequestException(
                'Arrival and Destination airport are the same',
            ); 
        }
        // check if the timestamps are correct.
        let currentTimestamp : number = await this.unixTimestamp();
        if(currentTimestamp < flightData.arrival_timestamp || currentTimestamp < flightData.departure_airport){
            throw new BadRequestException(
                'Timestamps entered are in the future',
            ); 
        }
        // check if departure happens before arrival
        if(flightData.arrival_timestamp < flightData.departure_timestamp){
            throw new BadRequestException(
                'Depature time is after arrival time',
            ); 
        }

        return await this.flightDataRepository.save(flightData);
    }


    unixTimestamp (): number {  
        return Math.floor(Date.now() / 1000);
    }
}