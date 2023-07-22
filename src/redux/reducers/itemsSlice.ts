import {createSlice} from '@reduxjs/toolkit';
import {AppState, Item, SliderItem} from '../../../types/types';
import {ListType} from '../../../types/enums';

import {
  convertList,
  getCleanList,
  getFilterdItems,
  getSelectedList,
  uniqueList,
} from '../../helpers/transformers';

const initialState: AppState = {
  itemsList: [],
  lists: {
    [ListType.BrandList]: {
      itemSelected: undefined,
      idFieldName: 'brandId' as keyof Item,
      nameFieldName: 'brandName' as keyof Item,
      list: [],
    },
    [ListType.QualityList]: {
      itemSelected: undefined,
      idFieldName: 'qualityId' as keyof Item,
      nameFieldName: 'qualityName' as keyof Item,
      list: [],
    },
    [ListType.SizeList]: {
      itemSelected: undefined,
      idFieldName: 'sizeId' as keyof Item,
      nameFieldName: 'sizeName' as keyof Item,
      list: [],
    },
  },
  selectedItem: undefined,
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setItemsList: (state, action) => {
      const {data} = action.payload;
      const parsedData = data as Item[];
      state.itemsList = parsedData;
      state.lists[ListType.BrandList].list = convertList(
        parsedData,
        state.lists[ListType.BrandList].idFieldName,
        state.lists[ListType.BrandList].nameFieldName,
        true,
      );
      state.lists[ListType.QualityList].list = convertList(
        parsedData,
        state.lists[ListType.QualityList].idFieldName,
        state.lists[ListType.QualityList].nameFieldName,
      );
      state.lists[ListType.SizeList].list = convertList(
        parsedData,
        state.lists[ListType.SizeList].idFieldName,
        state.lists[ListType.SizeList].nameFieldName,
      );
    },
    handleSelectionChange: (state, action) => {
      const {listType, item} = action.payload;
      const listTyped = listType as ListType;
      const itemTyped = item as SliderItem;

      // change selected item in the selected list
      state.lists[listTyped].itemSelected =
        state.lists[listTyped].itemSelected?.id === itemTyped.id
          ? undefined
          : itemTyped;

      state.lists[listTyped].list = getSelectedList(
        state.lists[listTyped].list,
        state.lists[listTyped].itemSelected,
      );

      state.selectedItem = undefined;

      // reset all lists below
      Object.keys(ListType)
        .filter(key => isNaN(Number(key)))
        .map(key => ListType[key as keyof typeof ListType])
        .filter(listOrder => listOrder > listTyped)
        .forEach(listIndex => {
          state.lists[listIndex].itemSelected = undefined;
          state.lists[listIndex].list = getCleanList(
            state.lists[listIndex].list,
          );
        });

      // item was selected - the lower list should be filtered
      if (state.lists[listTyped].itemSelected) {
        // get the filterd items list
        const filteredItems = getFilterdItems(
          state.itemsList,
          state.lists[ListType.BrandList].itemSelected,
          state.lists[ListType.QualityList].itemSelected,
          state.lists[ListType.SizeList].itemSelected,
        );

        // set selected item
        state.selectedItem =
          (filteredItems.length === 1 || uniqueList(filteredItems)) &&
          state.lists[ListType.BrandList].itemSelected &&
          state.lists[ListType.QualityList].itemSelected &&
          state.lists[ListType.SizeList].itemSelected
            ? filteredItems[0]
            : undefined;

        // take lower order list
        const listIndex = (listTyped + 1) as ListType;
        const numberOfKeys = Object.values(ListType).length / 2;
        if (listIndex <= numberOfKeys) {
          const subFilteredList = convertList(
            filteredItems,
            state.lists[listIndex].idFieldName,
            state.lists[listIndex].nameFieldName,
          );

          //exctarct ids of valid items
          const idsList = subFilteredList.map(elm => elm.id);

          if (
            (filteredItems.length === 1 || uniqueList(filteredItems)) &&
            state.lists[ListType.BrandList].itemSelected &&
            state.lists[ListType.QualityList].itemSelected
          ) {
            state.selectedItem = filteredItems[0];
          } else {
            // disable invalid items
            state.lists[listIndex].list = state.lists[listIndex].list.map(
              elm => {
                return {...elm, isActive: idsList.includes(elm.id)};
              },
            );
          }
        }
      }
    },
  },
});

export const {setItemsList, handleSelectionChange} = itemsSlice.actions;

export default itemsSlice.reducer;
