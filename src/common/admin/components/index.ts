import { ComponentLoader } from 'adminjs';

const componentLoader = new ComponentLoader();

const Components = {
  ManyToManyEdit: componentLoader.add(
    'ManyToManyEdit',
    './many-to-many.edit.tsx',
  ),
  // other custom components
};

export { componentLoader, Components };
