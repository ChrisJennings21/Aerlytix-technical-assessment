import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany, JoinColumn } from "typeorm"
import { PortfolioAircraft } from "./portfolioAircraft.entity"
import { Aircraft } from "./aircraft.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
@Unique(["portfolioName"])
export class Portfolio {
    @PrimaryGeneratedColumn()
    id: number
    
    @ApiProperty()
    @Column()
    portfolioName: string
    
    @ApiProperty()
    @OneToMany(() => Aircraft, aircraft => aircraft.portfolio)
    @JoinColumn()
    aircrafts: Aircraft[];
}
