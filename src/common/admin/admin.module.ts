import { Module } from '@nestjs/common';
import AdminJS, {
  ComponentLoader,
  RecordActionResponse,
  ResourceWithOptions,
} from 'adminjs';
import { Database, Resource } from '@adminjs/typeorm';
import { AdminModule as NestAdminModule } from '@adminjs/nestjs';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/roles/entities/role.entity';
import { Grant } from 'src/grants/entities/grant.entity';
import { componentLoader, Components } from './components';
import { unflatten } from 'flat';
import { CustomResource } from './admin.resource';

AdminJS.registerAdapter({ Database, Resource: CustomResource });
const setResponseItems = async (context, response, toResourceId) => {
  const { _admin, resource, record } = context;
  const toResource = _admin.findResource(toResourceId);
  console.log(
    '🚀 ~ file: admin.module.ts:22 ~ setResponseItems ~ toResource',
    toResource,
  );
  const options = { order: [toResource.titleField()] };
  const throughItems = await resource.findRelated(
    record,
    toResourceId,
    options,
  );
  const items = toResource.wrapObjects(throughItems);
  if (items.length !== 0) {
    const primaryKeyField = toResource.primaryKeyField();
    response.record.populated[toResourceId] = items;
    response.record.params[toResourceId] = items.map(
      (v) => v.params[primaryKeyField || 'id'],
    );
  }
};

//ResourceWithOptions
const userResource: any = {
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
        after: async (response: RecordActionResponse, request, context) => {
          const data = context.result;
          console.log(data);
          // if (request && request.method) {
          //   const manyProperties = context.resource.getManyProperties();
          //   if (context.action.name == 'edit' && request.method === 'get') {
          //     // Load all linked data
          //     await Promise.all(
          //       manyProperties.map(async (toResourceId) => {
          //         await setResponseItems(context, response, toResourceId);
          //       }),
          //     );
          //   }
          //   const { record } = context;
          //   if (request.method === 'post' && record.isValid()) {
          //     const params = unflatten(request.payload);
          //     await Promise.all(
          //       manyProperties.map(async (toResourceId) => {
          //         const ids = params[toResourceId]
          //           ? params[toResourceId].map((v) => parseInt(v))
          //           : [];
          //         await context.resource.saveRecords(record, toResourceId, ids);
          //       }),
          //     );
          //   }
          // }
          return response;
        },
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
      roles: {
        isVisible: {
          list: true,
          show: true,
          filter: true,
          edit: true,
        },
        isArray: true,
        reference: 'Role',
        components: {
          edit: Components.ManyToManyEdit,
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
          resources: [userResource, Role, Grant],
          branding: {},
          componentLoader: componentLoader,
        },
      }),
    }),
  ],
})
export class AdminModule {}
