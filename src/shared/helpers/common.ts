import { ClassConstructor, plainToInstance, ClassTransformOptions } from 'class-transformer';

export function fillDTO<T, V>(
  someDto: ClassConstructor<T>,
  plainObject: V,
  options: ClassTransformOptions = {}
): T {
  return plainToInstance(someDto, plainObject, {
    excludeExtraneousValues: true,
    ...options
  });
}

export function createErrorObject(message: string) {
  return {
    error: message,
  };
}
