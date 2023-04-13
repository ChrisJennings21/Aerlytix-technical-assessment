import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlightDataController } from './flight-data/flight-data.controller';
import { FlightDataModule } from './flight-data/flight-data.module';
import { FlightMetricsModule } from './flight-metrics/flight-metrics.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { aircraft } from './sharedEntitys/aircraft.entity';
import { aircraftType } from './sharedEntitys/aircraftType.entity';
import { airport } from './sharedEntitys/airport.entity';
import { flightData } from './sharedEntitys/flightData.entity';
import { portfolio } from './sharedEntitys/portfolio.entity';
import { portfolioAircraft } from './sharedEntitys/portfolioAircraft.entity';


@Module({
  imports: [FlightDataModule,FlightMetricsModule,PortfolioModule,TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'aerlytixdb',
    entities: [aircraft,aircraftType,airport,flightData,portfolio,portfolioAircraft],
    synchronize: true,
  }),],
  controllers: [],
  providers: [],
})
export class AppModule {}
