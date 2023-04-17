import { Body, Controller, Get, Query } from '@nestjs/common';
import { FlightMetricsService } from './flight-metrics.service';
import { FlightMetricsDto } from './dts/flightMetricsDto.dts';
import { ApiTags } from '@nestjs/swagger';

@Controller('flight-metrics')
@ApiTags("Flight Metrics API")

export class FlightMetricsController {

    constructor(public flightMetricsSerivce: FlightMetricsService){}

    @Get()
    async getPortfolioMetrics(@Body() flightMetricsDto: FlightMetricsDto){
        try{
            return await this.flightMetricsSerivce.getPortfolioMetrics(flightMetricsDto.portfolio_name, flightMetricsDto.last_24_hours)
        }
        catch(err){
            return err
        }
    }
    @Get("overview")
    async getOverviewMetrics(){
        try{
            return await this.flightMetricsSerivce.getOverviewMetrics()
        }
        catch(err){
            return err
        }
    }
}
