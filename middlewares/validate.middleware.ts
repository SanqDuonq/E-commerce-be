import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";

export const validateRequest = (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({
                errors: result.error.format()
            })
            return;
        }
        next();
    }
}