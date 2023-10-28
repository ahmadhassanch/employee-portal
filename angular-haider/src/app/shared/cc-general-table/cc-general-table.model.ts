import { Subject } from 'rxjs';

export interface GeneralTableColumn<T extends object> {
  name: NestedKeyOf<T> | 'select';
  title: string;
  format?:
    | 'date'
    | 'datetime'
    | 'number'
    | 'boolean'
    | 'connected'
    | 'replaceUnderscores'
    | null;
  align?: 'left' | 'center' | 'right';
  class?: classModel;
  filter?: FilterModel;
  width?: string;
  maxWidth?: string;
  customFormat?: (value: any, row: T) => string;
}

export class classModel {
  name?: string;
  fromValue?: boolean;
}

export type DateRangeFilter = {
  fromDate: number;
  toDate: number;
  sortData: any;
};

export type FilteredDataWithList = {
  column: string;
  selectedList: FilterDropDownModel[];
};

export type FilteredData = FilteredDataWithList | DateRangeFilter;

export type FilterDataList<T extends object> = {
  [K in NestedKeyOf<T> | 'select']?: FilteredData;
};

export interface FilterDataModel {
  isSortable?: boolean;
  enum?: FilterDropDownModel[];
  endpoint?: string;
  valueKey?: string;
  displayKey?: string;
  paginatedResponse?: boolean;
}

export interface FilterModel {
  filterType: 'DateRange' | 'Standard' | 'Integrated';
  data: FilterDataModel;
}

export interface RowAction<T> {
  title: string;
  action: string;
  condition?: (row: T, action: string) => boolean;
  // permission?: PermsObject | Array<PermsObject | PermissionNeeded>;
}

export interface FilterDropDownModel {
  value: string;
  viewValue: string;
  selected?: boolean;
}
export interface DropDownModel {
  title: string;
  list: dropList[];
  isMultiSelect: boolean;
  selected: any[];
}

export interface dropList {
  id: string;
  name: string;
}

export interface filterData {
  action: 'Close' | 'Apply' | 'Search';
  filters?: any;
}

export interface ChiGeneralSearch<T extends object> {
  name: NestedKeyOf<T>;
  id: NestedKeyOf<T>;
  concatKeys?: NestedKeyOf<T>[];
  separator?: string;
}

export type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

export class GeneralTableConfig<T extends object> {
  tableColumns: GeneralTableColumn<T>[] = [];
  tableIcon: string = 'inventory_2';
  title: any = '';
  actions?: Subject<any>;
  signalActions?: any[];
  customActions?: RowAction<T>[];
  booleanConditionActions: any[] = [];
  toggleActions: any[] = [];
  customActionsGeneral: any[] = [];
  isActive: boolean = false;
  isReportView: boolean = false;
  showheader: boolean = true;
  isSearchAllowed: boolean = true;
  dropDowntList: DropDownModel[] = [];
  // permissionResource: Resources;

  constructor(config?: Partial<GeneralTableConfig<T>>) {
    if (config) {
      Object.assign(this, config);
    }
  }
}
