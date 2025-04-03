import { IAuthStrategy } from "../interfaces/strategy.interface";
import { Request,Response, NextFunction } from "express";

export class AppContext {
    private strategy: IAuthStrategy;

    constructor(strategy: IAuthStrategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy: IAuthStrategy) {
        this.strategy = strategy;
    }

    async signIn(req: Request, res: Response, next?: NextFunction) {
        return this.strategy.signIn(req,res,next);
    }
}