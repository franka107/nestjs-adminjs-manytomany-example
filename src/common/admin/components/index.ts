import { ComponentLoader } from 'adminjs';

const componentLoader = new ComponentLoader();

const Components = {
  ManyToManyInput: componentLoader.add(
    'ManyToManyInput',
    './many-to-many.input.tsx',
  ),
  ManyToManyEdit: componentLoader.add(
    'ManyToManyEdit',
    './many-to-many.edit.tsx',
  ),
  // other custom components
};

export { componentLoader, Components };
