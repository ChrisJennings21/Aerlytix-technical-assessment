import { Test, TestingModule } from '@nestjs/testing';
import { FlightMetricsController } from './flight-metrics.controller';

describe('FlightMetricsController', () => {
  let controller: FlightMetricsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlightMetricsController],
    }).compile();

    controller = module.get<FlightMetricsController>(FlightMetricsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
