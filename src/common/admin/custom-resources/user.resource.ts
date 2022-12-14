import { ResourceWithOptions } from 'adminjs';
import { User } from 'src/users/entities/user.entity';
import {
  after,
  injectManyToManySupport,
  manyToManyComponent,
} from '../hooks/many-to-many.hook';
import * as bcrypt from 'bcrypt';

export const userResource: ResourceWithOptions = {
  resource: User,

  options: injectManyToManySupport(
    {
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
            list: false,
            show: true,
            filter: false,
            edit: true,
          },
        },
      },
      // sort: { sortBy: 'id', direction: 'asc' },
    },
    [{ propertyName: 'roles', modelClassName: 'Role' }],
  ),
};
