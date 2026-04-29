import { Reflector } from '@nestjs/core';

export const Permisssions = Reflector.createDecorator<string[]>();
