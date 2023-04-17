import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Portfolio } from 'src/Entitys/portfolio.entity';
import { PortfolioAircraft } from 'src/Entitys/portfolioAircraft.entity';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';
import { Aircraft } from 'src/Entitys/aircraft.entity';

@Module({
    controllers: [PortfolioController],
    providers: [PortfolioService],
    imports: [TypeOrmModule.forFeature([Portfolio, Aircraft])],
    exports: [PortfolioService]
})
export class PortfolioModule {}
