"use client";

import { Button } from "@nextui-org/button";

import { Image } from "@nextui-org/image";
import { useEffect, useState } from "react";

import { CardCarousel } from "./CardCarousel";
import ShareCardDialog from "./ShareCardDialog";
import { useCardStore } from "@/context/card/CardStore";
import { UploadAvatar } from "./UploadAvatar";

type Props = {
  view: "edit" | "preview";
  cardID?: string;
};

export const CardTemplateModern = ({ view, cardID }: Props) => {
  const [scrollTop, setScrollTop] = useState(0);
  const store = useCardStore();

  const colors = getColors(store.settings.dominantColor);

  useEffect(() => {
    const handleScroll = () => {
      setScrollTop(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="w-full max-w-sm grid gap-8 relative rounded-large p-3 m-auto bg-black">
      <div className="relative rounded-large overflow-clip mb-3 bg-default-50 min-h-[300px]">
        {view === "edit" && cardID && (
          <div className="absolute top-2 right-2 z-20">
            <UploadAvatar cardID={cardID} />
          </div>
        )}
        <Image
          alt={store.title}
          className="w-full"
          removeWrapper
          src={store.avatar?.url}
        />
        <div className="w-full h-1/2 bg-gradient-to-t from-black to-transparent absolute bottom-0 z-10" />
        <div
          style={{
            transform: `translateY(-${scrollTop / 8}px)`,
          }}
          className="z-20 w-full bottom-0 absolute text-center"
        >
          <h1 className="text-3xl font-bold ">{store.title}</h1>
          <p className="text-sm max-w-[200px] m-auto mb-2">
            {store.description}
          </p>
          <p className="text-xs font-bold">{store.organization}</p>
        </div>
      </div>

      <div className="grid gap-3">
        {store.settings?.showContactButton && (
          <Button
            style={{
              ...(colors && {
                backgroundColor: colors.background,
                color: colors.foreground,
              }),
            }}
          >
            Add to Contacts
          </Button>
        )}
        {store.settings?.showShareButton && (
          <ShareCardDialog
            id={cardID}
            imgSrc={store.avatar?.url}
            title={store.title}
            disableModal={view === "edit"}
          />
        )}
      </div>

      {store.bio && (
        <div className="rounded-large bg-default-50 p-4 text-center text-sm">
          {store.bio}
        </div>
      )}

      {store.modules?.carousel && (
        <CardCarousel items={store.modules.carousel} />
      )}
    </div>
  );
};

function getColors(rbgString?: string) {
  if (!rbgString) return;

  const rbg = rbgString
    .replace("rgb(", "")
    .replace(")", "")
    .split(",")
    .map((s) => parseInt(s));

  const color = Math.round((rbg[0] * 299 + rbg[1] * 587 + rbg[2] * 114) / 1000);
  const foreground = color > 125 ? "black" : "white";
  const background = "rgb(" + rbg[0] + ", " + rbg[1] + ", " + rbg[2] + ")";

  return { background, foreground };
}
