import {
  FormGroup,
  Input,
  InputGroup,
  Label,
  Select,
  SelectAsync,
} from '@adminjs/design-system';
import {
  ApiClient,
  BasePropertyProps,
  RecordJSON,
  SelectRecord,
} from 'adminjs';
import React, { useState } from 'react';

type SelectRecordEnhanced = SelectRecord & {
  record: RecordJSON;
};
// just some regular React component
const getOptionsFromRecords = (records) => {
  return records.map((r) => ({ value: r.id, label: r.title }));
};

const getItems = (record, name) => {
  if (record.populated && record.populated[name]) {
    return getOptionsFromRecords(record.populated[name]);
  }
  return [];
};

const ManyToManyInput = (props: BasePropertyProps) => {
  const { property, record, onChange } = props;

  return (
    <FormGroup>
      <Label>{property.label}</Label>
      <ResourceSelection />
    </FormGroup>
  );
};

const ResourceSelection = (props) => {
  const { onChange, name, selected: initialSelection, resourceId } = props;
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(initialSelection);
  const api = new ApiClient();

  // const loadOptions = (): any  => {}
  const loadOptions = (): any => {
    // const records = await api.searchRecords({
    //   resourceId: resourceId,
    //   query: inputValue,
    // });
    // const options = getOptionsFromRecords(records);
    // setOptions(options);
    return [{ value: 'chocolate', label: 'test' }];
  };

  const handleChange = (selectedOptions) => {
    setSelected(selectedOptions);
    onChange(
      name,
      selectedOptions.map((v) => v.value),
    );
  };

  return (
    // <Select isMulti defaultOptions loadOptions={loadOptions} value={selected} onChange={handleChange} />
    <Select value={''} options={loadOptions()} />
  );
};

export default ManyToManyInput;
