"use client";

import { cn } from "@/lib/utils";
import { CarouselItem } from "@/types/CardTypes";
import { Button } from "@nextui-org/button";

import { Card } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { ExternalLink } from "lucide-react";

type Props = {
  items: CarouselItem[];
};

export const CardCarousel = ({ items }: Props) => {
  if (items.length === 0) return <></>;

  return (
    <div className="w-full h-80 relative gap-4 flex snap-x snap-mandatory overflow-auto ">
      {items.map((item, i) => {
        const isImgOnly = !item.title && !item.description;

        const linkProps = {
          href: item.url,
          target: "_blank",
        };

        return (
          <Card
            key={i}
            as="a"
            {...(item.url ? linkProps : {})}
            isPressable={!!item.url}
            className="w-10/12 snap-always relative first:ml-10 last:mr-10  max-w-xs h-full p-2 flex flex-col rounded-large snap-center shrink-0"
          >
            {item.url && (
              <Button
                className="absolute top-3 right-3 z-20"
                isIconOnly
                size="sm"
                variant="flat"
              >
                <ExternalLink className="w-3" />
              </Button>
            )}
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
