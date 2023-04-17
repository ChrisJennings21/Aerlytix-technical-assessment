import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from "typeorm"
import { Portfolio } from "./portfolio.entity";

@Entity()
export class PortfolioAircraft {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Portfolio, portfolio => portfolio.aircrafts)
    portfolio: Portfolio;



}