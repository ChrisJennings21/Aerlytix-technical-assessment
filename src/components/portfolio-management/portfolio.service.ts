import { BadRequestException, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Aircraft } from 'src/Entitys/aircraft.entity';
import { Portfolio } from 'src/Entitys/portfolio.entity';
import { Repository } from 'typeorm';

export interface portfolioInterface {
    portfolioName: string
}
export interface aircraftInterface {
    aircraftRegistration: string,
    portfolioID: number
}

@Injectable()
export class PortfolioService {
    // This service uses both the portfolio and aircraft repositorys 
    constructor(@InjectRepository(Portfolio)
    private portfolioRepository: Repository<Portfolio>, @InjectRepository(Aircraft)
        private AircraftRepository: Repository<Aircraft>) {
    }

    // creates a new portfolio 
    async create(portfolio: portfolioInterface) {
        try {
            return await this.portfolioRepository.save(portfolio);
        }
        catch (err) {
            // if a user trys to insert the portfolio name that has allready been entered the unique constrain on the colum will trigger an error which is caught and a message returned to the sender
            if (err.code = "R_DUP_ENTRY") {
                throw new BadRequestException(
                    'A portfolio with this name allready exists',
                );
            }
            return err;
        }
    }


    // this function finds all portfolios in the datbase table
    findAll(): Promise<Portfolio[]> {
        return this.portfolioRepository.find();
    }

    // finds one portfolio when presented the portfolio ID. contains the aircrafts linked to the portfolio
    async findOne(id: number): Promise<Portfolio> {
        return await this.portfolioRepository.findOne({
            where: {
                id: id,
            }, relations: ['aircrafts']
        });
    }

    // function finds a portfolio by name which is a unquie string given to each portfolio. This is needed as users input the name of the portfolio and not the ID.
    async findOneByName(name: string): Promise<Portfolio> {
        return await this.portfolioRepository.findOneBy({ portfolioName: name });
    }

    async addAircraftToPortfolio(aircraftInterface: aircraftInterface) {
        // get the portfolio object from the database to post releation to portfolio
        var selectedPortfolio = await this.portfolioRepository.findOne({ where: { id: aircraftInterface.portfolioID }, relations: ['aircrafts'] });
        // check if the portfolio exists
        if (selectedPortfolio == undefined) {
            throw new BadRequestException(
                'Portfolio ID given does not match a portfolio in the system',
            );
        }
        // Check if the aircraft is allready within this portfolio
        else if (selectedPortfolio.aircrafts.find(aircraft => aircraft.registrationCode === aircraftInterface.aircraftRegistration)) {
            throw new BadRequestException(
                'Aircraft allready in this portfolio',
            );
        }
        // if all these constraints have passed update the aircraft to point to the correct portfolio
        else {
            var aircraftToUpdate = await this.AircraftRepository.findOne({ where: { registrationCode: aircraftInterface.aircraftRegistration }, relations: ['portfolio'] });
            aircraftToUpdate.portfolio.push(selectedPortfolio);
            return await this.AircraftRepository.save(aircraftToUpdate);
        }
    }

    async removeAircraftToPortfolio(aircraftInterface: aircraftInterface) {
        // set the portfolio FK to null in the aircraft table
        var aircraftToUpdate = await this.AircraftRepository.findOne({ where: { registrationCode: aircraftInterface.aircraftRegistration }, relations: ['portfolio'] });
        aircraftToUpdate.portfolio = aircraftToUpdate.portfolio.filter(portfolio => portfolio.id != aircraftInterface.portfolioID);
        await this.AircraftRepository.save(aircraftToUpdate);
    }

    async deletePortfolio(portfolio: portfolioInterface) {
        return await this.portfolioRepository.delete({ portfolioName: portfolio.portfolioName });
    }
}
