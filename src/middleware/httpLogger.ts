import { NextFunction, Request, RequestHandler, Response } from 'express';

const isProd = process.env.NODE_ENV === 'production';

export function httpLogger(site: string): RequestHandler {
    return function(request: Request, response: Response, next: NextFunction): void {
        // console.log(`[${request.statusCode}]: ${request.ip}`);
        console.log(`>>> httpLogger says: site ${site} visited`);
        next();
    }
}
