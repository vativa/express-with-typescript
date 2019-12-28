import 'reflect-metadata';
import { MetadataKeys } from './MethadataKeys';

export function propsValidator(...keys: string[]): Function {
    return function(target: any, key: string, desc: PropertyDescriptor): void {
        Reflect.defineMetadata(MetadataKeys.VALIDATOR, keys, target, key);
    }
}
