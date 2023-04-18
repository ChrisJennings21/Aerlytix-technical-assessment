import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class FlightMetricsDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public last_24_hours: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public portfolio_name: string;

}