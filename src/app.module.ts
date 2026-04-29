import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { datasourceConfig } from './db/data-source';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RolesModule } from './roles/roles.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/guards/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(datasourceConfig),
    AuthModule,
    UserModule,
    RolesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useExisting: AuthGuard,
    },
  ],
})
export class AppModule {}
