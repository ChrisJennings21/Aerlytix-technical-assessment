
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AircraftType } from 'src/Entitys/aircraftType.entity';
import { Portfolio } from 'src/Entitys/portfolio.entity';
import { Repository } from 'typeorm';


export class portfolioMetricsResult {
    
    public regisration: string;

    public aircraft_model: string;

    public total_number_of_flights: number = 0;

    public total_flight_hours: number = 0;

}

export class overviewMetricsResult {
    
    public aircraft_model: string;

    public total_number_of_flights: number = 0;

    public total_flight_hours: number = 0;

}

@Injectable()
export class FlightMetricsService {

    constructor(@InjectRepository(Portfolio)
    private portfolioRepository: Repository<Portfolio>, @InjectRepository(AircraftType)
    private aircraftTypeRepository: Repository<AircraftType>){}

    async getPortfolioMetrics(portfolioName : string, last24: string){
        try{
            var portfolioFlightHistory =  await this.portfolioRepository.findOne({
                where: {
                    portfolioName: portfolioName,
                }, relations: ['aircrafts', "aircrafts.flightData", "aircrafts.aircraftType"]
            })
            return await this.transformDataToReport(portfolioFlightHistory, last24)
        }
        catch (err){
            return err
        }
    }

    async getOverviewMetrics(){
        try{
            // get aircraft type data with aircraft and flight data relations. this will give the data needed to generate an overview report.
            var overviewFlightHistory =  await this.aircraftTypeRepository.find({
                relations: ["aircrafts.flightData"]
            })
            return await this.transformOverviewToReport(overviewFlightHistory)
        }
        catch (err){
            return err
        }
    }

    transformOverviewToReport(aircraftData : AircraftType[] ){
        let report = [];
        // loop through aircraft types
        for(let aircraftTypeIndex = 0; aircraftTypeIndex < aircraftData.length; aircraftTypeIndex++){
            let temporyResult : overviewMetricsResult = new overviewMetricsResult;
            temporyResult.aircraft_model = aircraftData[aircraftTypeIndex].aircraftType
            // loop through aircraft in each aircraft type
            for(let aircraftIndex = 0; aircraftIndex < aircraftData[aircraftTypeIndex].aircrafts.length; aircraftIndex ++){
                // loop through each flight that aircraft had and calculate total flights and flight hours
                for(let flightDataIndex = 0; flightDataIndex <  aircraftData[aircraftTypeIndex].aircrafts[aircraftIndex].flightData.length; flightDataIndex++){
                    // calculate the different between depature and arrival time stamps and add it to total flight hours
                    temporyResult.total_flight_hours += (aircraftData[aircraftTypeIndex].aircrafts[aircraftIndex].flightData[flightDataIndex].arrival_timestamp - aircraftData[aircraftTypeIndex].aircrafts[aircraftIndex].flightData[flightDataIndex].departure_timestamp)
                    // increment as we read in each flight 
                    temporyResult.total_number_of_flights += 1;
                }
            }
            // push each result to the final array to return to user.
            report.push(temporyResult)
        }
        return report
    }

    // function to transform and calculate data for reports. Would generally do most of this work using sql query but for purpose of project creating an in memory solution
    transformDataToReport(flightData: Portfolio, last24: string){
        // initialise return array to be empty
        let report = [];
        let currentTimestamp = this.unixTimestamp();
        // loop through the result from DB. The result will contain aircrafts in specified portfolio and their assosiated flight data
        for(let aircraftIndex = 0; aircraftIndex < flightData.aircrafts.length; aircraftIndex++){

            let temporyResult : portfolioMetricsResult = new portfolioMetricsResult;
            temporyResult.regisration = flightData.aircrafts[aircraftIndex].registrationCode;
            temporyResult.aircraft_model = flightData.aircrafts[aircraftIndex].aircraftType.aircraftType;
            // loop through flight data for each aircraft. here caluclate the count of total flight hours and total flights. Here also if the user is asking for the last 24 hours filter the flights to only include last 24 hours
            for(let flightDataIndex = 0; flightDataIndex < flightData.aircrafts[aircraftIndex].flightData.length; flightDataIndex++){
                if(last24.toLowerCase() == "false"){
                    temporyResult.total_flight_hours += (flightData.aircrafts[aircraftIndex].flightData[flightDataIndex].arrival_timestamp - flightData.aircrafts[aircraftIndex].flightData[flightDataIndex].departure_timestamp);
                    temporyResult.total_number_of_flights += 1;
                }
                else{
                    if(flightData.aircrafts[aircraftIndex].flightData[flightDataIndex].arrival_timestamp > (currentTimestamp - 86400)){
                        temporyResult.total_flight_hours += (flightData.aircrafts[aircraftIndex].flightData[flightDataIndex].arrival_timestamp - flightData.aircrafts[aircraftIndex].flightData[flightDataIndex].departure_timestamp);
                        temporyResult.total_number_of_flights += 1; 
                    }
                }
            }
            report.push(temporyResult)
        }
        return report
    }

    unixTimestamp () {  
        return Math.floor(Date.now() / 1000)
      }

}
