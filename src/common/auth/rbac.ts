import { IStorageRbac } from 'src/rbac';

export const RBAC: IStorageRbac = {
  roles: ['administrator', 'user'],
  permissions: {
    users: ['create', 'list'],
  },
  grants: {
    administrator: ['users'],
  },
  filters: {},
};
