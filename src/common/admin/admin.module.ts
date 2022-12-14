import { Module } from '@nestjs/common';
import AdminJS, { RecordActionResponse } from 'adminjs';
import { Database } from '@adminjs/typeorm';
import { AdminModule as NestAdminModule } from '@adminjs/nestjs';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/roles/entities/role.entity';
import { Grant } from 'src/grants/entities/grant.entity';
import { componentLoader, Components } from './components';
import { unflatten } from 'flat';
import { CustomResource } from './admin.resource';
import { after, manyToManyComponent } from './hooks/many-to-many.hook';

AdminJS.registerAdapter({ Database, Resource: CustomResource });

//ResourceWithOptions
const userResource: any = {
  resource: User,
  options: {
    actions: {
      new: {
        after: after,
        before: async (request) => {
          if (request.payload?.password) {
            const saltOrRounds = 10;
            request.payload.password = await bcrypt.hash(
              request.payload.password,
              saltOrRounds,
            );
          }
          return request;
        },
      },
      edit: {
        after: after,
        before: async (request) => {
          // no need to hash on GET requests, we'll remove passwords there anyway
          if (request.method === 'post') {
            // hash only if password is present, delete otherwise
            // so we don't overwrite it
            if (request.payload?.password) {
              const saltOrRounds = 10;
              request.payload.password = await bcrypt.hash(
                request.payload.password,
                saltOrRounds,
              );
            } else {
              delete request.payload?.password;
            }
          }
          return request;
        },
      },
    },

    properties: {
      password: {
        isVisible: {
          list: true,
          show: true,
          filter: false,
          edit: true,
        },
      },
      roles: manyToManyComponent('Role'),
    },
  },
};

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
