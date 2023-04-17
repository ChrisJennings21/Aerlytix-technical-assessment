import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, } from "class-validator";


export class FlightDataDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    public flight_number: string;
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    public registration: string;
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    public departure_airport: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    public arrival_airport: string;

    @ApiProperty()
    @IsNumber()
    public departure_timestamp: number;

    @ApiProperty()
    @IsNumber()
    public arrival_timestamp: number;

  }