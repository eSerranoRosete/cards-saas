"use client";

import { CarouselItem } from "@/types/CardTypes";

import { IconButton } from "@radix-ui/themes";
import { ExternalLink } from "lucide-react";

type Props = {
  items: CarouselItem[];
};

export const CardCarousel = ({ items }: Props) => {
  if (items.length === 0) return <></>;

  return (
    <div className="w-full h-full relative gap-4 flex snap-x snap-mandatory pr-8 overflow-auto ">
      {items.map((item, i) => {
        const isImgOnly = !item.title && !item.description;

        const linkProps = {
          href: item.url,
          target: "_blank",
        };

        return (
          <a
            {...(linkProps.href && { ...linkProps })}
            key={i}
            className="w-11/12 snap-always bg-zinc-900 rounded-lg relative gap-2 first:ml-8 max-w-xs h-80 p-2 flex flex-col rounded-large snap-center shrink-0"
          >
            {item.url && (
              <IconButton
                className="absolute top-3 right-3 z-20"
                color="gray"
                variant="soft"
              >
                <ExternalLink className="w-3" />
              </IconButton>
            )}

            <div className="w-full h-full relative grow">
              <img
                className={"w-full object-cover absolute h-full rounded-lg"}
                src={item.img.url}
                alt={item.title}
              />
            </div>
            {!isImgOnly && (
              <div className="w-full h-auto px-2">
                <div className="text-left">
                  {item.title && (
                    <p className="font-semibold w-full inline-block ">
                      {item.title}
                    </p>
                  )}
                  {item.description && (
                    <p className="text-sm text-default-500">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            )}
          </a>
        );
      })}
    </div>
  );
};
