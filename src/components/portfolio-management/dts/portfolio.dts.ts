import { ApiProperty } from "@nestjs/swagger";
import { portfolioNameTaken } from "../../portfolio-management/validation/portfolioValidator"


export class portfolioDto {
  @ApiProperty()
  public portfolioName: string;
}