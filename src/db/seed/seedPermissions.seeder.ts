import { DataSource } from 'typeorm';
import { seedCheckStatus } from './utils/seedStatus';
import { Permission } from 'src/roles/entities/permission.entity';

export async function seedPermissions(dataSource: DataSource) {
  console.log('Seeding permissions into the database ....');

  const SEED_CODE = '01-Basic-Permissions';
  const exists = await seedCheckStatus(dataSource, SEED_CODE);
  if (exists) return;

  const repo = dataSource.getRepository(Permission);

  await repo.save([
    // USERS
    { name: 'user:create' },
    { name: 'user:read' },
    { name: 'user:update' },
    { name: 'user:delete' },

    // ROLES
    { name: 'role:create' },
    { name: 'role:read' },
    { name: 'role:update' },
    { name: 'role:delete' },

    // ESPACIOS
    { name: 'space:create' },
    { name: 'space:read' },
    { name: 'space:update' },
    { name: 'space:delete' },

    // HORARIOS
    { name: 'schedule:create' },
    { name: 'schedule:read' },
    { name: 'schedule:update' },
    { name: 'schedule:delete' },

    // INCIDENCIAS
    { name: 'incident:create' },
    { name: 'incident:read' },
    { name: 'incident:update' },

    // MANTENIMIENTO
    { name: 'maintenance:create' },
    { name: 'maintenance:read' },
    { name: 'maintenance:update' },
  ]);

  console.log('Completed permissions!');
}
