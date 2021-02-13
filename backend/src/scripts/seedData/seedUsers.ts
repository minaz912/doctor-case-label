import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { UsersService } from '../../users/users.service';

async function bootstrap() {
  const application = await NestFactory.createApplicationContext(AppModule);

  const usersService = application.get(UsersService);
  await Promise.all([
    usersService.create({
      email: 'john_doe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      password: 'example',
    }),
    usersService.create({
      email: 'jane_doe@example.com',
      firstName: 'Jane',
      lastName: 'Doe',
      password: 'example',
    }),
  ]);

  await application.close();
  process.exit(0);
}

bootstrap();
