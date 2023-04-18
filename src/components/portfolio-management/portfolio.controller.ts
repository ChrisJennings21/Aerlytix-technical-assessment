import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { portfolioDto } from './dto/portfolio.dts';
import { PortfolioService } from './portfolio.service';
import { AircraftDto } from './dto/AircraftDto.dts';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Portfolio } from 'src/Entitys/portfolio.entity';

@Controller('portfolio')
@ApiTags("Portfolio API")
export class PortfolioController {
    constructor(private portfolioService: PortfolioService) { }

    @Post()
    createPortfolio(@Body() portfolioDto: portfolioDto) {
        try {
            return this.portfolioService.create(portfolioDto)
        }
        catch (err) {
            return err
        }
    }

    @Get()
    async findAll() {
        return await this.portfolioService.findAll();
    }

    @Get(":id")
    async findOne(@Param('id') id: number) {
        return await this.portfolioService.findOne(id);
    }

    @Patch("addAircraft")
    addAircraftToPortfolio(@Body() aircraftDTO: AircraftDto) {
        return this.portfolioService.addAircraftToPortfolio(aircraftDTO)
    }

    @Patch("removeAircraft")
    removeAircraftFromPortfolio(@Body() aircraftDTO: AircraftDto) {
        return this.portfolioService.removeAircraftToPortfolio(aircraftDTO)
    }

    @Delete()
    deletePortfolio(@Body() portfolioDto: portfolioDto) {
        return this.portfolioService.deletePortfolio(portfolioDto)
    }
}
