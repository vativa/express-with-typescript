import 'reflect-metadata';
import { Methods } from './Methods';
import { MetadataKeys } from './MethadataKeys';

function routeBinder(method: string): Function {
    return function get(path: string): Function {
        return function (target: any, key: string, desc: PropertyDescriptor): void {
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
