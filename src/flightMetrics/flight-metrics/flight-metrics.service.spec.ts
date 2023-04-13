import { Test, TestingModule } from '@nestjs/testing';
import { FlightMetricsService } from './flight-metrics.service';

describe('FlightMetricsService', () => {
  let service: FlightMetricsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlightMetricsService],
    }).compile();

    service = module.get<FlightMetricsService>(FlightMetricsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
