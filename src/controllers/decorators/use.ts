import 'reflect-metadata';
import { RequestHandler } from 'express';
import { MetadataKeys } from './MethadataKeys';

export function use(middleware: RequestHandler): Function {
    return function(target: any, key: string, desc: PropertyDescriptor): void {
        const middlewares = Reflect.getMetadata(MetadataKeys.MIDDLEWARE, target, key) || [];
        Reflect.defineMetadata(MetadataKeys.MIDDLEWARE, [...middlewares, middleware], target, key);
    }
}
