"use client";

import { cn } from "@/lib/utils";
import { CarouselItem } from "@/types/CardTypes";

import { Card } from "@nextui-org/card";
import { Image } from "@nextui-org/image";

type Props = {
  items: CarouselItem[];
};

export const CardCarousel = ({ items }: Props) => {
  if (items.length === 0) return <></>;

  return (
    <div className="w-full h-80 relative gap-4 flex snap-x snap-mandatory overflow-auto">
      {items.map((item, i) => {
        const isImgOnly = !item.title && !item.description;

        return (
          <Card
            key={i}
            isPressable
            className="w-10/12 snap-always max-w-xs h-full p-2 flex flex-col rounded-large snap-center shrink-0"
          >
            <Image
              removeWrapper
              className={cn(
                "w-full h-full object-cover",
                !isImgOnly && "max-h-[70%]"
              )}
              src={item.img.url}
              alt={item.title || ""}
            />

            {!isImgOnly && (
              <div className="p-2 py-4 h-full text-left">
                <p className="font-semibold w-full inline-block ">
                  {item.title}
                </p>
                <p className="text-sm text-default-500">{item.description}</p>
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
};
