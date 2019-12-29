import 'reflect-metadata';
import { RequestHandler } from 'express';
import { MetadataKeys } from './MethadataKeys';
import { Methods } from './Methods';

interface RouteHandlerDescriptor extends PropertyDescriptor {
    value?: RequestHandler;
}

function routeBinder(method: string) {
    return function(path: string) {
        return function (target: any, key: string, desc: RouteHandlerDescriptor): void {
            Reflect.defineMetadata(MetadataKeys.PATH, path, target, key);
            Reflect.defineMetadata(MetadataKeys.METHOD, method, target, key);
        }
    }
}

export const get = routeBinder(Methods.GET);
export const post = routeBinder(Methods.POST);
export const put = routeBinder(Methods.PUT);
export const patch = routeBinder(Methods.PATCH);
export const del = routeBinder(Methods.DELETE);
export const all = routeBinder(Methods.ALL);
export const head = routeBinder(Methods.HEAD);
