import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class airport {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    airportCode: string

}