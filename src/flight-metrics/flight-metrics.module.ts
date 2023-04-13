import { Module } from '@nestjs/common';
import { FlightDataController } from 'src/flight-data/flight-data.controller';
import { FlightDataService } from 'src/flight-data/flight-data.service';

@Module({
    controllers: [FlightDataController],
    providers: [FlightDataService],
    exports: [FlightDataService]
})
export class FlightMetricsModule {}
