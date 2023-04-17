import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";
import { type } from "os";

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