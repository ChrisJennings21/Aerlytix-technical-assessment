import { Body, Controller, Get, Query } from '@nestjs/common';
import { FlightMetricsService } from './flight-metrics.service';
import { FlightMetricsDto } from './dto/flightMetricsDto.dts';
import { ApiTags } from '@nestjs/swagger';

@Controller('flight-metrics')
@ApiTags("Flight Metrics API")

export class FlightMetricsController {

    constructor(public flightMetricsSerivce: FlightMetricsService) { }

    @Get()
    async getPortfolioMetrics(@Query('portfolioName') portfolioName: string,
        @Query('last24') last24: boolean) {
        // parse last24 to boolean
        if(last24.toString() === "false"){
            last24 = false;
        }
        else if(last24.toString() === "true"){
            last24 = true;
        }
        return await this.flightMetricsSerivce.getPortfolioMetrics(portfolioName, last24);
    }
    
    @Get("overview")
    async getOverviewMetrics() {
        return await this.flightMetricsSerivce.getOverviewMetrics();

    }
}
