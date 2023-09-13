import { CarouselItem } from "@/types/CardTypes";

type AddItem = {
  items?: CarouselItem[];
  newItem: CarouselItem;
};

export const addCarouselItem = ({ items = [], newItem }: AddItem) => {
  return [...items, newItem];
};

type DeleteItem = {
  items?: CarouselItem[];
  id: string;
};

export const deleteCarouselItem = ({ items = [], id }: DeleteItem) => {
  return items.filter((item) => item.id !== id);
};

type UpdateItem = {
  items?: CarouselItem[];
  oldID: string;
  newItem: Omit<CarouselItem, "id">;
};

export const updateCarouselItem = ({
  items = [],
  newItem,
  oldID,
}: UpdateItem) => {
  return items.map((item) => {
    if (item.id === oldID) {
      return {
        ...item,
        ...newItem,
        id: oldID,
      };
    }
    return item;
  });
};
