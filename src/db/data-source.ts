import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSourceOptions } from 'typeorm';
import { DataSource } from 'typeorm';

config();
const configService = new ConfigService();
export const datasourceConfig: DataSourceOptions = {
  type: 'mysql',
  host: configService.get<string>('DATABASE_HOST') ?? 'localhost',
  port: configService.get<number>('DATABASE_PORT') ?? 3306,
  username: configService.get<string>('DATABASE_USER') ?? 'root',
  password: configService.get<string>('DATABASE_PASSWORD') ?? 'root',
  database: configService.get<string>('DATABASE_NAME') ?? 'test',
  entities: [__dirname + '/../**/*.entity{.js,.ts}'],
  migrations: [__dirname + '/migrations/*{.js,.ts}'],
};

const dataSource = new DataSource(datasourceConfig);

export default dataSource;
