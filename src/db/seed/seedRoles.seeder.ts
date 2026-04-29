import { DataSource } from 'typeorm';
import { seedCheckStatus } from './utils/seedStatus';
import { Role } from '../../roles/entities/role.entity';
import { Permission } from '../../roles/entities/permission.entity';

export async function seedRoles(dataSource: DataSource) {
  console.log('Seeding roles into the database ....');

  const SEED_CODE = '02-Basic-Roles';
  const exists = await seedCheckStatus(dataSource, SEED_CODE);
  if (exists) return;

  const roleRepo = dataSource.getRepository(Role);
  const permRepo = dataSource.getRepository(Permission);

  const adminPermissions = await permRepo.find();

  const admin = roleRepo.create({
    name: 'Administrador',
    permissions: adminPermissions,
  });

  const academic = roleRepo.create({
    name: 'Area Academica',
    permissions: await permRepo.find({
      where: [
        { name: 'schedule:create' },
        { name: 'schedule:update' },
        { name: 'schedule:read' },
        { name: 'space:read' },
        { name: 'incident:read' },
      ],
    }),
  });

  const prefect = roleRepo.create({
    name: 'Prefecto',
    permissions: await permRepo.find({
      where: [
        { name: 'space:read' },
        { name: 'schedule:read' },
        { name: 'incident:create' },
        { name: 'incident:read' },
      ],
    }),
  });

  await roleRepo.save([admin, academic, prefect]);

  console.log('Completed roles!');
}
