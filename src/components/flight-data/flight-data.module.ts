import { Module } from '@nestjs/common';
import { FlightDataController } from './flight-data.controller';
import { FlightDataService } from './flight-data.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlightData } from 'src/Entitys/flightData.entity';
import { Aircraft } from 'src/Entitys/aircraft.entity';
import { Airport } from 'src/Entitys/airport.entity';

@Module({
    controllers: [FlightDataController],
    providers: [FlightDataService],
    exports: [FlightDataService],
    imports: [TypeOrmModule.forFeature([FlightData, Airport, Aircraft])],

})
export class FlightDataModule {}
