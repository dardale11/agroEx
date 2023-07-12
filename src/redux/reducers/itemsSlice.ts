import {createSlice} from '@reduxjs/toolkit';
import {AppState, Item, SliderItem} from '../../../types/types';
import {ListType} from '../../../types/enums';

import {convertList, getFilterdItems} from '../../helpers/transformers';

const initialState: AppState = {
  itemsList: [],
  lists: {
    [ListType.BrandList]: {itemSelected: undefined, list: []},
    [ListType.QualityList]: {itemSelected: undefined, list: []},
    [ListType.SizeList]: {itemSelected: undefined, list: []},
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
        'brandId',
        'brandName',
      );
      state.lists[ListType.QualityList].list = convertList(
        parsedData,
        'qualityId',
        'qualityName',
      );
      state.lists[ListType.SizeList].list = convertList(
        parsedData,
        'sizeId',
        'sizeName',
      );
    },
    handleSelectionChange: (state, action) => {
      const {listType, item} = action.payload;
      const listTyped = listType as ListType;
      const itemTyped = item as SliderItem;

      if (!itemTyped.isSelected) {
        // set selected item for list
        state.lists[listTyped].itemSelected = itemTyped;

        // set unactive and selected for UI
        state.lists[listTyped].list = state.lists[listTyped].list.map(elm =>
          elm.id === itemTyped.id
            ? {...elm, isSelected: true}
            : {...elm, isActive: false},
        );

        // get the filterd items list
        const filteredItems = getFilterdItems(
          state.itemsList,
          listTyped === ListType.BrandList
            ? itemTyped
            : state.lists[ListType.BrandList].itemSelected,
          listTyped === ListType.QualityList
            ? itemTyped
            : state.lists[ListType.QualityList].itemSelected,
          listTyped === ListType.SizeList
            ? itemTyped
            : state.lists[ListType.SizeList].itemSelected,
        );
        // if only one item in list then it is selected
        console.log(filteredItems);
        if (filteredItems.length === 1) {
          state.selectedItem = filteredItems[0];
        }
        // iterate over the diffrent lists in order to manipulate the other lists
        Object.keys(ListType)
          .filter(key => isNaN(Number(key)))
          .map(key => ListType[key as keyof typeof ListType])
          .filter(list => list !== listTyped)
          .map(otherList => {
            // if list already selected so no need to change
            if (!state.lists[otherList].itemSelected) {
              const first = state.lists[otherList].list[0];
              const subFilteredList = convertList(
                filteredItems,
                first.idFieldName,
                first.nameFieldName,
              );

              //exctarct ids of valid items
              const idsList = subFilteredList.map(elm => elm.id);
              state.lists[otherList].list = state.lists[otherList].list.map(
                elm => {
                  return {...elm, isActive: idsList.includes(elm.id)};
                },
              );
            }
          });

        // item was un selected
      } else {
        state.lists[listTyped].itemSelected = undefined;
        state.lists[listTyped].list = state.lists[listTyped].list.map(
          itemSlider => {
            return {...itemSlider, isSelected: false};
          },
        );
        const filteredItems = getFilterdItems(
          state.itemsList,
          listTyped === ListType.BrandList
            ? undefined
            : state.lists[ListType.BrandList].itemSelected,
          listTyped === ListType.QualityList
            ? undefined
            : state.lists[ListType.QualityList].itemSelected,
          listTyped === ListType.SizeList
            ? undefined
            : state.lists[ListType.SizeList].itemSelected,
        );
        if (filteredItems.length > 1) {
          state.selectedItem = undefined;
        }
        Object.keys(ListType)
          .filter(key => isNaN(Number(key)))
          .map(key => ListType[key as keyof typeof ListType])
          .map(otherList => {
            if (!state.lists[otherList].itemSelected) {
              const first = state.lists[otherList].list[0];
              const subFilteredList = convertList(
                filteredItems,
                first.idFieldName,
                first.nameFieldName,
              );
              const idsList = subFilteredList.map(elm => elm.id);
              state.lists[otherList].list = state.lists[otherList].list.map(
                elm => {
                  return {...elm, isActive: idsList.includes(elm.id)};
                },
              );
            }
          });
      }
    },
  },
});

export const {setItemsList, handleSelectionChange} = itemsSlice.actions;

export default itemsSlice.reducer;
