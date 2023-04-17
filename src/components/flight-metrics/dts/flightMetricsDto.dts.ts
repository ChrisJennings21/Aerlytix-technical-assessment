import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean } from "class-validator";
import { type } from "os";

export class FlightMetricsDto {

  @ApiProperty()
  public last_24_hours: string;

  @ApiProperty()
  public portfolio_name: string;

}