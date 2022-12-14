// import { RecordJSON, PropertyJSON } from '../../../interfaces';
// import { flat } from '../../../../utils';
// import { convertToSubProperty } from './convert-to-sub-property';
import { Section } from '@adminjs/design-system';
import { ValueGroup, ButtonGroup } from '@adminjs/design-system';
import {
  ApiClient,
  EditPropertyPropsInArray,
  RecordJSON,
  SelectRecord,
  PropertyJSON,
  flat,
} from 'adminjs';
import React, { ReactNode } from 'react';
import ReferenceValue from './reference-value';

type Props = {
  property: PropertyJSON;
  record: RecordJSON;
  ItemComponent: typeof React.Component;
};

export default class ManyToManyShow extends React.PureComponent<Props> {
  render(): ReactNode {
    const { property, record, ItemComponent } = this.props;
    const DELIMITER = '.';

    const getSubpropertyPath = (path: string, index: number) =>
      [path, index].join(DELIMITER);

    const convertToSubProperty = (
      arrayProperty: PropertyJSON,
      index: number,
    ): PropertyJSON => ({
      ...arrayProperty,
      path: getSubpropertyPath(arrayProperty.path, index),
      label: `[${index + 1}]`,
      isArray: false,
      isDraggable: false,
    });

    const items = flat.get(record.params, property.path) || [];

    return (
      <>
        <ValueGroup label={property.label}>
          {(items || []).map((item, i) => {
            // const itemProperty = convertToSubProperty(property, i);
            return (
              <ReferenceValue
                key={i}
                {...this.props}
                record={item}
                property={property}
              />
            );
          })}

          {/*<Section> {(items || []).map((item, i) => {
            const itemProperty = convertToSubProperty(property, i);
            return (
              <ItemComponent
                {...this.props}
                key={itemProperty.path}
                property={itemProperty}
              />
            );
          })}
        </Section>
					*/}
        </ValueGroup>
      </>
    );
  }
}
