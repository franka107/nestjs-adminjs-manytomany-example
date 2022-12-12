import { Module } from '@nestjs/common';
import AdminJS, { RecordActionResponse, ResourceWithOptions } from 'adminjs';
import { Database, Resource } from '@adminjs/typeorm';
import { AdminModule as NestAdminModule } from '@adminjs/nestjs';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';

AdminJS.registerAdapter({ Database, Resource });

const userResource: ResourceWithOptions = {
  resource: User,
  options: {
    actions: {
      new: {
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
    },
  },
};

@Module({
  imports: [
    NestAdminModule.createAdminAsync({
      useFactory: () => ({
        adminJsOptions: {
          rootPath: '/admin',
          resources: [userResource],
        },
      }),
    }),
  ],
})
export class AdminModule {}
