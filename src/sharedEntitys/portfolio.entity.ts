import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class portfolio {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    portfolioName: string

}