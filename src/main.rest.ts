import 'reflect-metadata';
import { RestApplication } from './rest/rest.application.js';
import { Component } from './shared/types/component.enum.js';
import { createAppContainer } from './rest/rest.container.js';

process.on('triggerUncaughtException', (err) => {
  console.error('Unhandled Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});


async function bootstrap() {
  const container = createAppContainer();
  const application = container.get<RestApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();
