import { ApiProperty } from "@nestjs/swagger";
import { Aircraft } from "src/Entitys/aircraft.entity";
import { Airport } from "src/Entitys/airport.entity";


export class FlightDataDto {

    @ApiProperty()
    public flight_number: string;
    
    @ApiProperty()
    public registration: Aircraft;
    
    @ApiProperty()
    public departure_airport: Airport;

    @ApiProperty()
    public arrival_airport: Airport;

    @ApiProperty()
    public departure_timestamp: number;

    @ApiProperty()
    public arrival_timestamp: number;

  }