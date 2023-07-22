import {ListType} from '../../types/enums';
import {Item, SliderItem} from '../../types/types';

export function convertList(
  itemList: Item[],
  idFieldName: keyof Item,
  nameFieldName: keyof Item,
  setActive: boolean = false,
): SliderItem[] {
  const convertedList: SliderItem[] = [];
  const idSet = new Set<number>();

  itemList.forEach(item => {
    const itemId = item[idFieldName] as number;
    const itemName = item[nameFieldName] as string;

    if (itemId && itemName && !idSet.has(itemId)) {
      idSet.add(itemId);
      convertedList.push({
        id: itemId,
        name: itemName,
        isActive: setActive,
        isSelected: false,
      });
    }
  });

  return convertedList;
}

export function getFilterdItems(
  itemList: Item[],
  selectedBrand: SliderItem | undefined,
  selectedQuality: SliderItem | undefined,
  selectedSize: SliderItem | undefined,
) {
  return itemList.filter(
    item =>
      (selectedBrand ? item.brandName === selectedBrand.name : true) &&
      (selectedQuality ? item.qualityName === selectedQuality.name : true) &&
      (selectedSize ? item.sizeName === selectedSize.name : true),
  );
}

export function getSelectedList(
  list: SliderItem[],
  itemTyped: SliderItem | undefined,
) {
  return list.map((item: SliderItem) => {
    return {...item, isSelected: item.id === itemTyped?.id};
  });
}

export function getCleanList(list: SliderItem[]) {
  return list.map(elm => {
    return {...elm, isActive: false, isSelected: false};
  });
}

export function uniqueList(list: Item[]) {
  const first: Item = list[0];
  for (let item of list) {
    if (
      item.brandName !== first.brandName ||
      item.qualityName !== first.qualityName ||
      item.sizeName !== first.sizeName
    ) {
      return false;
    }
  }
  return true;
}
