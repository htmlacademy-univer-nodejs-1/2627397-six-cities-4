import mongoose from 'mongoose';
import { injectable, inject } from 'inversify';
import { Logger } from '../logger/logger.interface.js';
import { Component } from '../../types/component.enum.js';
import { DatabaseClient } from './database-client.interface.js';

const RETRY_COUNT = 5;
const RETRY_DELAY = 1000;

@injectable()
export class MongoDatabaseClient implements DatabaseClient {
  private connected = false;

  constructor(
    @inject(Component.Logger) private logger: Logger
  ) {}

  public async connect(uri: string): Promise<void> {
    if (this.connected) {
      throw new Error('MongoDB client already connected');
    }
    this.logger.info('Trying to connect to MongoDB…');
    let attempts = 0;
    while (attempts < RETRY_COUNT) {
      try {
        await mongoose.connect(uri);
        this.connected = true;
        this.logger.info('MongoDB connection established');
        return;
      } catch (error) {
        attempts++;
        this.logger.error(`Connection attempt ${attempts} failed`, error as Error);
        await new Promise(res => setTimeout(res, RETRY_DELAY));
      }
    }
    throw new Error('Could not connect to MongoDB after retries');
  }

  public async disconnect(): Promise<void> {
    if (!this.connected) {
      throw new Error('MongoDB client not connected');
    }
    await mongoose.disconnect();
    this.connected = false;
    this.logger.info('MongoDB connection closed');
  }
}
