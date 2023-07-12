import {Item, SliderItem} from '../../types/types';

export function convertList(
  itemList: Item[],
  idFieldName: keyof Item,
  nameFieldName: keyof Item,
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
        isActive: true,
        isSelected: false,
        idFieldName: idFieldName,
        nameFieldName: nameFieldName,
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
