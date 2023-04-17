import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class AircraftDto {
    @ApiProperty() 
    @IsNumber()
    @IsNotEmpty()  
    public portfolioID: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()  
    public aircraftRegistration: string;

}