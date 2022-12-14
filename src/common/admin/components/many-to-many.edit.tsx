import React, { FC, useState, useEffect } from 'react';
import {
  FormGroup,
  FormMessage,
  Label,
  SelectAsync,
} from '@adminjs/design-system';
import {
  ApiClient,
  EditPropertyProps,
  EditPropertyPropsInArray,
  PropertyLabel,
  RecordJSON,
  SelectRecord,
} from 'adminjs';
import { unflatten } from 'flat';

type CombinedProps = EditPropertyPropsInArray;
type SelectRecordEnhanced = SelectRecord & {
  record: RecordJSON;
};

const EditManyToManyInput: FC<CombinedProps> = (props) => {
  const { onChange, property, record } = props;
  const { reference: resourceId } = property;

  if (!resourceId) {
    throw new Error(`Cannot reference resource in property '${property.path}'`);
  }

  const handleChange = (selected: any[]): void => {
    setSelectedOptions(selected);
    if (selected) {
      onChange(
        property.path,
        selected.map((s) => ({ id: s.value })),
      );
    } else {
      onChange(property.path, null);
    }
  };

  const loadOptions = async (
    inputValue: string,
  ): Promise<SelectRecordEnhanced[]> => {
    const api = new ApiClient();

    const optionRecords = await api.searchRecords({
      resourceId,
      query: inputValue,
    });
    console.log(
      '🚀 ~ file: many-to-many.edit.tsx:52 ~ optionRecords',
      optionRecords,
    );

    return optionRecords.map((optionRecord: RecordJSON) => ({
      value: optionRecord.id,
      label: optionRecord.title,
      record: optionRecord,
    }));
  };
  const error = record?.errors[property.path];

  const selectedValues = unflatten(record.params)[property.path] || [];
  console.log(
    '🚀 ~ file: many-to-many.edit.tsx:69 ~ //handleChange ~ unflattenParams',
    selectedValues,
  );

  const selectedId = record?.params[property.path] as string | undefined;
  const [loadedRecord, setLoadedRecord] = useState<RecordJSON | undefined>();
  const [loadingRecord, setLoadingRecord] = useState(0);
  const selectedValue = record?.populated[property.path] ?? loadedRecord;
  const selectedValuesToOptions = selectedValues.map((selectedValue) => ({
    value: selectedValue.id,
    label: selectedValue.name,
  }));
  const [selectedOptions, setSelectedOptions] = useState(
    selectedValuesToOptions,
  );
  console.log(
    '🚀 ~ file: many-to-many.edit.tsx:81 ~ //handleChange ~ selectedOptions',
    selectedOptions,
  );

  // const selectedOption =
  //   selectedId && selectedValue
  //     ? {
  //         value: selectedValue.id,
  //         label: selectedValue.title,
  //       }
  //     : {
  //         value: '',
  //         label: '',
  //       };

  useEffect(() => {
    if (!selectedValue && selectedId) {
      setLoadingRecord((c) => c + 1);
      const api = new ApiClient();
      api
        .recordAction({
          actionName: 'show',
          resourceId,
          recordId: selectedId,
        })
        .then(({ data }: any) => {
          setLoadedRecord(data.record);
        })
        .finally(() => {
          setLoadingRecord((c) => c - 1);
        });
    }
  }, [selectedValue, selectedId, resourceId]);

  return (
    <FormGroup error={Boolean(error)}>
      {/* <PropertyLabel property={property} /> */}
      <Label>{property.label}</Label>
      <SelectAsync
        isMulti
        cacheOptions
        value={selectedOptions}
        defaultOptions
        loadOptions={loadOptions}
        onChange={handleChange}
        isClearable
        isDisabled={property.isDisabled}
        isLoading={!!loadingRecord}
        {...property.props}
      />
      <FormMessage>{error?.message}</FormMessage>
    </FormGroup>
  );
};

export default EditManyToManyInput;
