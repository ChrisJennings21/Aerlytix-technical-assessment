import { Module } from '@nestjs/common';
import { FlightDataController } from './flightData/flight-data/flight-data.controller';
import { FlightDataModule } from './flightData/flight-data/flight-data.module';
import { FlightMetricsModule } from './flightMetrics/flight-metrics/flight-metrics.module';
import { PortfolioModule } from './portfolio/portfolio/portfolio.module';


@Module({
  imports: [FlightDataModule,FlightMetricsModule,PortfolioModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
