import { RequestHandler } from "express";
import createHttpError from "http-errors";

export const requiresAuth:RequestHandler = (req, res, next) => {
    if (req.session.userId){
        console.log('hola')
        next()
    }
    else {
        next(createHttpError(401, 'User not authenticated'))
    }
}