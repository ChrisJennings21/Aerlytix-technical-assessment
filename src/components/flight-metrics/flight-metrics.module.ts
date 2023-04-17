import { Module } from '@nestjs/common';
import { FlightMetricsService } from './flight-metrics.service';
import { FlightMetricsController } from './flight-metrics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Portfolio } from 'src/Entitys/portfolio.entity';
import { AircraftType } from 'src/Entitys/aircraftType.entity';

@Module({
    controllers: [FlightMetricsController],
    providers: [FlightMetricsService],
    exports: [FlightMetricsService],
    imports: [TypeOrmModule.forFeature([Portfolio, AircraftType])],

})
export class FlightMetricsModule {}
