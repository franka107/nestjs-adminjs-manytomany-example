import { ComponentLoader } from 'adminjs';

const componentLoader = new ComponentLoader();

const Components = {
  ManyToManyEdit: componentLoader.add(
    'ManyToManyEdit',
    './many-to-many.edit.tsx',
  ),
  ManyToManyShow: componentLoader.add(
    'ManyToManyShow',
    './many-to-many.show.tsx',
  ),
  ManyToManyList: componentLoader.add(
    'ManyToManyList',
    './many-to-many.list.tsx',
  ),
  // other custom components
};

export { componentLoader, Components };
