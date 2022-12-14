import { Module } from '@nestjs/common';
import AdminJS, { RecordActionResponse, ResourceWithOptions } from 'adminjs';
import { Database } from '@adminjs/typeorm';
import { AdminModule as NestAdminModule } from '@adminjs/nestjs';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/roles/entities/role.entity';
import { Grant } from 'src/grants/entities/grant.entity';
import { componentLoader, Components } from './components';
import { CustomResource } from './admin.resource';
import { after, manyToManyComponent } from './hooks/many-to-many.hook';
import { userResource } from './custom-resources/user.resource';

AdminJS.registerAdapter({ Database, Resource: CustomResource });

//ResourceWithOptions

@Module({
  imports: [
    NestAdminModule.createAdminAsync({
      useFactory: () => ({
        adminJsOptions: {
          rootPath: '/admin',
          resources: [userResource, Role, Grant],
          branding: {},
          componentLoader: componentLoader,
        },
      }),
    }),
  ],
})
export class AdminModule {}
