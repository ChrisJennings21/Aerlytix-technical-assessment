import { Body, Controller, Post } from '@nestjs/common';
import { FlightDataDto } from './dto/flightDataDto.dts';
import { FlightDataService } from './flight-data.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('flight-data')
@ApiTags("Flight Ingestion API")
export class FlightDataController {
    constructor(public flightDataService: FlightDataService){}
    
    @Post()
    async inputFlightData(@Body() flightDataDto: FlightDataDto){
        return await this.flightDataService.create(flightDataDto);
    }

}
