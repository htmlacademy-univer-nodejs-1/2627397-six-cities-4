import 'reflect-metadata';
import { RestApplication } from './rest/rest.application.js';
import { Component } from './shared/types/component.enum.js';
import { createAppContainer } from './rest/rest.container.js';

async function bootstrap() {
  const container = createAppContainer();
  const application = container.get<RestApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();
