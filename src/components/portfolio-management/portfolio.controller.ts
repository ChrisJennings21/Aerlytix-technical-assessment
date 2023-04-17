import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { portfolioDto } from './dts/portfolio.dts';
import { PortfolioService } from './portfolio.service';
import { AircraftDto } from './dts/AircraftDto.dts';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Portfolio } from 'src/Entitys/portfolio.entity';

@Controller('portfolio')
@ApiTags("Portfolio API")
export class PortfolioController {
    constructor(private portfolioService: PortfolioService) {}

    @ApiCreatedResponse({type: Portfolio})
    @Post()
    createPortfolio(@Body() portfolioDto: portfolioDto){
        try{
            return this.portfolioService.create(portfolioDto)
        }
        catch(err){
            return err
        }
    }

    @Get()
    async findAll(){
        return await this.portfolioService.findAll();
    }

    @Get(":id")
    async findOne(@Param('id') id: number){
        return await this.portfolioService.findOne(id);
    }

    @Patch("addAircraft")
    addAircraftToPortfolio(@Body() aircraftDTO: AircraftDto){
        try{
            return this.portfolioService.addAircraftToPortfolio(aircraftDTO)
        }
        catch(err){
            return err
        }
    }

    @Patch("removeAircraft")
    removeAircraftFromPortfolio(@Body() aircraftDTO: AircraftDto){
        try{
            return this.portfolioService.removeAircraftToPortfolio(aircraftDTO)
        }
        catch(err){
            return err
        }
    }

    @Delete()
    deletePortfolio(@Body() portfolioDto: portfolioDto){
        try{
            return this.portfolioService.deletePortfolio(portfolioDto)
        }
        catch(err){
            return err
        }
    }
}
