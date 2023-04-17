import { ApiProperty } from "@nestjs/swagger";


export class AircraftDto {
    @ApiProperty() 
    public portfolioID: number;

    @ApiProperty()
    public aircraftRegistration: string;

}