import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";


export class portfolioDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public portfolioName: string;
}