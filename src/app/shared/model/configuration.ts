export interface Configuration {
  fields?: Field[];
  lockTime?: number;
  slicedFields?: [Field[]];
}


export interface Option {
  label: string;
  value: string;
}

export interface Field {
  order?: number;
  label?: string;
  enableTranslate?: boolean;
  mappedField: string;
  width?: string;
  type: number;
  options?: Option[];
  minLen?: number;
  maxLen?: number;
  value?: any;
}

