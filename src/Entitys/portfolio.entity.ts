import { Entity, PrimaryGeneratedColumn, Column, Unique, JoinColumn, ManyToMany, JoinTable } from "typeorm"
import { Aircraft } from "./aircraft.entity";

@Entity()
@Unique(["portfolioName"])
export class Portfolio {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    portfolioName: string

    @ManyToMany(() => Aircraft, aircraft => aircraft.portfolio,  {
        cascade: true,
        onDelete: "CASCADE"
      })
    aircrafts: Aircraft[];
}
