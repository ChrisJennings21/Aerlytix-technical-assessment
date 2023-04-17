
import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
  } from 'class-validator';

import { PortfolioService } from '../portfolio.service';
import { Injectable } from '@nestjs/common';
@Injectable()
@ValidatorConstraint({ async: true })
export class isPortfolioNameTaken implements ValidatorConstraintInterface {
    constructor( public portfolioService : PortfolioService) {}
  
    async validate(portfolioName: string) {
        console.log(portfolioName)
        console.log(await this.portfolioService.findOneByName(portfolioName))
        return this.portfolioService.findOneByName(portfolioName).then((portfolio) => {
            return portfolio === undefined;
      });
    }
  }
  
  export function portfolioNameTaken(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: isPortfolioNameTaken,
      });
    };
  }