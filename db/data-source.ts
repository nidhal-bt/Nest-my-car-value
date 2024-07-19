import { DataSource, DataSourceOptions } from 'typeorm';

// dev mode
const dataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  synchronize: false,
  database: 'dev.sqlite',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  migrationsRun: true,
};

// test mode
// const dataSourceOptions: DataSourceOptions = {
//   type: 'sqlite',
//   synchronize: false,
//   database: 'test.sqlite',
//   entities: [__dirname + '/../src/**/*.entity.ts'],
//   migrations: [__dirname + '/../dist/db/migrations/*.js'],
//   migrationsRun: true,
// };

export { dataSourceOptions };
const dataSource = new DataSource(dataSourceOptions);
typeof dataSourceOptions.type;

export default dataSource;
