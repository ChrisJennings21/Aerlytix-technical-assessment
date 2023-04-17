import { ApiProperty } from "@nestjs/swagger";


export class portfolioDto {
  @ApiProperty()
  public portfolioName: string;
}