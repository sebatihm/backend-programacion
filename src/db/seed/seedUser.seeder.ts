import { User } from '../../user/entities/user.entity';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { seedCheckStatus } from './utils/seedStatus';
import { Role } from '../../roles/entities/role.entity';
import * as bcrypt from 'bcrypt';

export async function seedUserAdmin(dataSource: DataSource) {
  console.log('Seeding admin into the database ....');

  const SEED_CODE = '03-Users';

  const exists = await seedCheckStatus(dataSource, SEED_CODE);
  if (exists) return;

  const config = new ConfigService();
  const repo = dataSource.getRepository(User);
  const repoRole = dataSource.getRepository(Role);

  const password = await bcrypt.hash(
    config.get<string>('ADMIN_PASSWORD')!,
    parseInt(config.get<string>('SALT_ROUNDS')!),
  );

  const role = await repoRole.findOne({
    where: { id: 1 },
    relations: ['permissions'],
  });

  if (!role) {
    throw new Error('Role not found');
  }

  const user = repo.create({
    name: 'Sebastian',
    email: config.get<string>('ADMIN_EMAIL'),
    password: password,
    last_name: 'Hernandez',
    last_mother_name: 'Montero',
    role: role,
  });

  await repo.save(user);
  console.log('Completed users!');
}
