"use client";

import { Card } from "@nextui-org/card";
import { Image } from "@nextui-org/image";

const items: CarouselItem[] = [
  {
    title: "My Product 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, labore.",
    img: "https://images.unsplash.com/photo-1682685797898-6d7587974771?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3270&q=80",
  },
  {
    img: "https://images.unsplash.com/photo-1520078452277-0832598937e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2835&q=80",
  },
  {
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3272&q=80",
    title: "My Product 2",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, labore.",
  },
];

type CarouselItem = {
  title?: string;
  description?: string;
  img: string;
};

export const CardCarousel = () => {
  return (
    <div className="w-full h-80 relative gap-4 flex snap-x snap-mandatory overflow-auto">
      {items.map((item, i) => (
        <Card
          key={i}
          isPressable
          className="w-10/12 snap-always max-w-xs h-full p-2 flex flex-col rounded-large snap-center shrink-0"
        >
          <div className="w-full rounded-large bg-black grow">
            <Image
              removeWrapper
              className="w-full h-full object-cover"
              src={item.img}
              alt={item.title || ""}
            />
          </div>
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
