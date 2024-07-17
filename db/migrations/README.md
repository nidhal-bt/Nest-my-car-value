# Migration

new update has been added to typeorm in V0.3.0 for that all the commands has been changed in V0.2.\*
for new commandes we need to work with
https://github.com/typeorm/typeorm/blob/master/docs/using-cli.md

- DataSource:
  TypeORM's DataSource holds your database connection settings and establishes initial database connection or connection pool depending on the RDBMS you use. In order to establish initial connection / connection pool you must call initialize method of your DataSource instance.

* scripts
  generate new migration from existing entity in project: npm run migration:generate -- db/migrations/newMigration
  create new migration: npx typeorm migration:create ./db/migrations/testCreate
