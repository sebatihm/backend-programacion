import { DataSource } from 'typeorm';
import { SeedLog } from '../log/seedLog.entity';

export async function seedCheckStatus(dataSource: DataSource, code: string) {
  const repo = dataSource.getRepository(SeedLog);

  const status = await repo.exists({ where: { code } });

  if (status) {
    console.log('Seeder already runnned, skiping to the next one...');
  } else {
    await repo.save({ code });
  }
  return status;
}
