import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
      cache: true,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017doctor-case-label'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
