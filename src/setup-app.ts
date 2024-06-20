import { INestApplication, ValidationPipe } from '@nestjs/common';
const cookieSession = require('cookie-session');

// easy method to fix test environment configuration access
// in test environment e2e don't have access to main.ts file,
// so we find issue with access to every function declared inside main.ts like pipes, middlewares, gaurds,...
// we add setupApp to ensure both test and development modes have the same configuration
export const setupApp = (app: INestApplication) => {
  // you can add all middlewares or pipes
  app.use(
    cookieSession({
      keys: ['aze'],
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
};
