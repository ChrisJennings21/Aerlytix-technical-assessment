import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlightDataModule } from './components/flight-data/flight-data.module';
import { FlightMetricsModule } from './components/flight-metrics/flight-metrics.module';
import { PortfolioModule } from './components/portfolio-management/portfolio.module';
import { Aircraft } from './Entitys/aircraft.entity';
import { AircraftType } from './Entitys/aircraftType.entity';
import { Airport } from './Entitys/airport.entity';
import { FlightData } from './Entitys/flightData.entity';
import { Portfolio } from './Entitys/portfolio.entity';


@Module({
  imports: [FlightDataModule,FlightMetricsModule,PortfolioModule,TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'technicalassessmentdb',
    entities: [Aircraft,AircraftType,Airport,FlightData,Portfolio],
    synchronize: true,
  }),],
  controllers: [],
  providers: [ {
    provide: APP_PIPE,
    useClass: ValidationPipe,
  },],
  
})
export class AppModule {}
