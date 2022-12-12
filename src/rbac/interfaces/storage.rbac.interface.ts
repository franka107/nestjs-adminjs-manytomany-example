import { IFilterPermission } from '../permissions/interfaces/filter.permission.interface';

export interface IStorageRbac {
  roles: string[];
  permissions: any;

  grants: any;
  filters: { [key: string]: any | IFilterPermission };
}
