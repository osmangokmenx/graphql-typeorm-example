import { DataSource } from 'typeorm';
import { User } from './entity/User';

export const db = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'graphql-typeorm',
  synchronize: true,
  logging: true,
  entities: [User],
  migrations: [],
  subscribers: [],
});
