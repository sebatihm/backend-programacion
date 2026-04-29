// seed.ts

import dataSource from '../data-source';
import { seedPermissions } from './seedPermissions.seeder';
import { seedRoles } from './seedRoles.seeder';

async function runSeed() {
  console.log('Initializing all seeders to the provided datasource');
  await dataSource.initialize();

  await seedPermissions(dataSource);
  await seedRoles(dataSource);

  await dataSource.destroy();
  console.log('Completed all the seeders!');
}

runSeed().catch((err) => {
  console.error('Error en seed:', err);
  process.exit(1);
});
