import { Module } from '@nestjs/common';
import { FlightDataController } from 'src/flightData/flight-data/flight-data.controller';
import { FlightDataService } from 'src/flightData/flight-data/flight-data.service';

@Module({
    controllers: [FlightDataController],
    providers: [FlightDataService],
    exports: [FlightDataService]
})
export class FlightMetricsModule {}
