import 'reflect-metadata';
import { AppRouter } from '../../AppRouter';
import { MetadataKeys } from './MethadataKeys';
import { Methods } from './Methods';
import { NextFunction, RequestHandler, Request, Response } from 'express';

function propsValidators(keys: string): RequestHandler {
    return function (request: Request, response: Response, next: NextFunction): void {
        if (!request.body) {
            response.status(422).send("Invalid request");
            return;
        }
        for (let key of keys) {
            if (!request.body[key]) {
                response.status(422).send(`Missing property ${key}`);
                return;
            }
        }
        next();
    };
}

export function controller(pref: string): Function {
    return function(target: Function): void {
        const router = AppRouter.instance;
        for (let key in target.prototype) {
            const routeHandler = target.prototype[key];
            const path = Reflect.getMetadata(MetadataKeys.PATH, target.prototype, key);
            const method: Methods = Reflect.getMetadata(MetadataKeys.METHOD, target.prototype, key);
            const middlewares = Reflect.getMetadata(MetadataKeys.MIDDLEWARE, target.prototype, key) || [];
            const requiredProps = Reflect.getMetadata(MetadataKeys.VALIDATOR, target.prototype, key) || [];
            const validator = propsValidators(requiredProps);
            if (path) {
                router[method](`${pref}${path}`, ...middlewares, validator, routeHandler);
            }
        }
    }
}
