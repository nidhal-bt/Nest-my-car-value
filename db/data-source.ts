import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  synchronize: false,
  database: '',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  migrationsRun: false,
};

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dataSourceOptions, { database: 'db.sqlite' });
    break;
  case 'test':
    Object.assign(dataSourceOptions, {
      database: 'test.sqlite',
      migrationsRun: true,
    });
    break;
  case 'production':
    Object.assign(dataSourceOptions, {
      database: 'prod.sqlite',
      migrationsRun: true,
    });
    break;

  default:
    break;
}

const dataSource = new DataSource(dataSourceOptions);
typeof dataSourceOptions.type;

export default dataSource;
