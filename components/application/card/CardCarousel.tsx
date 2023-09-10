"use client";

import { Card } from "@nextui-org/card";

const items: CarouselItem[] = [
  {
    title: "My Product 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, labore.",
  },
  {
    title: "My Product 2",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, labore.",
  },
  {
    img: "https://picsum.photos/200/300",
  },
  {
    title: "My Product 4",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, labore.",
  },
];

type CarouselItem = {
  title?: string;
  description?: string;
  img?: string;
};

export const CardCarousel = () => {
  return (
    <div className="w-full h-80 relative gap-4 flex snap-x snap-mandatory overflow-auto">
      {items.map((item, i) => (
        <Card
          key={i}
          isPressable
          className="w-10/12 snap-always  h-full p-2 flex flex-col rounded-large snap-center shrink-0"
        >
          <div className="w-full rounded-large bg-black grow"></div>
          {(item.title || item.description) && (
            <div className="p-2 py-4 text-left">
              <p className="font-semibold w-full inline-block ">{item.title}</p>
              <p className="text-sm text-default-500">{item.description}</p>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};
