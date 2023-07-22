import {ListType} from './enums';

export interface Item {
  id: number;
  name: string;
  fullName: string;
  brandId: number;
  brandName: string;
  qualityId?: number;
  qualityName?: string;
  sizeId?: number;
  sizeName?: string;
}

export interface SliderItem {
  id: number;
  name: string;
  isActive: boolean;
  isSelected: boolean;
}

export interface AppState {
  itemsList: Item[];
  lists: Record<ListType, ListContainer>;
  selectedItem: Item | undefined;
}

export interface ListContainer {
  itemSelected: SliderItem | undefined;
  idFieldName: keyof Item;
  nameFieldName: keyof Item;
  list: SliderItem[];
}
